import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemArrayDto } from './dto/item-array.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post('manage')
  async manageItems(@Body() reqData: ItemArrayDto) {

    let createDataList = [];
    let updateDataList = [];
    // try {
    const allData = await this.itemsService.findAll();
    console.log(allData)
    reqData.items.forEach((item) => {
      if (!item.id) {
        createDataList.push(item);
      } else {
        // const existingItem = allData.some(obj => obj.id === item.id)
        // if (!existingItem) {
        //   throw new NotFoundException(`Item with id ${item.id} not found`);
        // }
        updateDataList.push(item);
      }
    });


    const idSet = new Set(updateDataList.map(item => item.id));
    const deleteData = allData.filter(item => !idSet.has(item.id));
    const deleteDataList = new Set(deleteData.map(item => item.id));

    const createdItems = await this.itemsService.createItems({ items: createDataList });
    const updatedItems = await this.itemsService.updateItems({ items: updateDataList });
    const deletedItemIds = await this.itemsService.deleteItems([...deleteDataList]);

    return {
      createdItems,
      updatedItems,
      deletedItemIds,
    }
    // } catch (error) {
    //   console.error("error.status", error.status)
    //   console.error("error.response", error.response)
    //   console.error("error.response.message", error.response.message)
    //   throw new HttpException('Something went worng', HttpStatus.INTERNAL_SERVER_ERROR);
    // }
  }
}
