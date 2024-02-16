// src/items/items.service.ts

import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemArrayDto } from './dto/item-array.dto';
import { UpdateItemArrayDto } from './dto/update-item-array.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) { }


  public async findAll() {
    const result = await this.prisma.items.findMany();
    return result
  }

  public async createItems(itemsArray: ItemArrayDto): Promise<ItemDto[]> {
    if (itemsArray && itemsArray.items.length > 0) {
      await this.prisma.items.createMany({
        data: itemsArray.items,
      });
      const newItems = await this.prisma.items.findMany({});
      return newItems as ItemDto[];;
    }
    return [];
  }

  public async updateItems(itemsArray: UpdateItemArrayDto): Promise<UpdateItemDto[]> {
    const promises = itemsArray.items.map(async (item) => {
      const existingItem = await this.prisma.items.findUnique({
        where: { id: item.id },
      });

      if (!existingItem) {
        throw new NotFoundException(`Item with id ${item.id} not found`);
      }

      return this.prisma.items.update({
        where: { id: item.id },
        data: item,
      });
    });

    return Promise.all(promises);
  }

  public async deleteItems(itemIds: number[]): Promise<number[]> {
    if (itemIds && itemIds.length > 0) {
      await this.prisma.items.deleteMany({
        where: {
          id: { in: itemIds },
        },
      });

      return itemIds;
    }
    return [];
  }
}
