import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, Res } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemArrayDto } from './dto/item-array.dto';
import { sendSuccess } from 'src/utilities/controllers_handlers/handle_response';
import { Response } from 'express';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post('manage')
  async manageItems(@Body() reqData: ItemArrayDto, @Res() res: Response) {

    let createDataList = [];
    let updateDataList = [];
    // try {
    const allData = await this.itemsService.findAll();
    reqData.items.forEach((item) => {
      if (!item.id) {
        createDataList.push(item);
      } else {
        updateDataList.push(item);
      }
    });

    const idSet = new Set(updateDataList.map(item => item.id));
    const deleteData = allData.filter(item => !idSet.has(item.id));
    const deleteDataList = new Set(deleteData.map(item => item.id));

    const items = await this.itemsService.manage(
      { items: createDataList },
      { items: updateDataList },
      [...deleteDataList]
    );
    return sendSuccess(res, 200, items);
  }
}
