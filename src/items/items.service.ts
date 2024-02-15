// src/items/items.service.ts

import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) { }


  public async findAll() {
    const result = await this.prisma.items.findMany();
    return result
  }

  public async createItems(items: ItemDto[]): Promise<ItemDto[]> {
    if (items && items.length > 0) {
      await this.prisma.items.createMany({
        data: items,
      });

      // After creation, retrieve the newly created items
      const newItems = await this.prisma.items.findMany({});

      return newItems;
    }
    return [];
  }

  public async updateItems(items: UpdateItemDto[]): Promise<UpdateItemDto[]> {
    const promises = items.map(async (item) => {
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
