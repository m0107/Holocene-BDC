import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post('manage')
  async manageItems(@Body() itemsData: ItemDto[]) {

    let createDataList = [];
    let updateDataList = [];
    const allData = await this.itemsService.findAll();

    console.log(itemsData)
    itemsData.forEach((item) => {
      if (!item.id) {
        createDataList.push(item);
      } else {
        updateDataList.push(item);
      }
    });


    // Create a Set of IDs from array2 for faster lookups
    const idSet = new Set(updateDataList.map(item => item.id));


    // Remove elements from array1 based on the common ID in array2
    const deleteData = allData.filter(item => !idSet.has(item.id));

    const deleteDataList = new Set(deleteData.map(item => item.id));

    const createdItems = await this.itemsService.createItems(createDataList);
    const updatedItems = await this.itemsService.updateItems(updateDataList);
    const deletedItemIds = await this.itemsService.deleteItems([...deleteDataList]);

    return {
      createdItems,
      updatedItems,
      deletedItemIds,
    };
  }
}
