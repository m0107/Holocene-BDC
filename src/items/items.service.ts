// src/items/items.service.ts



import { Injectable, Body, NotFoundException, HttpException, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemDto } from './dto/item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemArrayDto } from './dto/item-array.dto';
import { UpdateItemArrayDto } from './dto/update-item-array.dto';
import { error } from 'console';
import handle_errors from 'src/utilities/controllers_handlers/handle_errors';
import { Prisma, PrismaClient } from '@prisma/client';
@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) { }

  public async manage(
    createItemsArray: ItemArrayDto,
    updateItemsArray: UpdateItemArrayDto,
    itemIds: number[]
  ): Promise<ItemDto[] | UpdateItemDto> {
    try {

      const manageResult = await this.prisma.$transaction(async (prisma: PrismaService) => {
        const deletedItemIds = await this.deleteItems(itemIds, prisma);
        const updatedItems = await this.updateItems(updateItemsArray, prisma);
        const createdItems = await this.createItems(createItemsArray, prisma);


        // Combine and return the results as needed
        return [...createdItems, ...updatedItems];
      });

      return manageResult;
    } catch (error) {
      console.error("Error in manage service", error);
      throw error
    }
  }

  public async findAll() {
    const result = await this.prisma.items.findMany();
    return result
  }

  private async createItems(itemsArray: ItemArrayDto, prisma: PrismaService): Promise<ItemDto[]> {
    try {
      let newItems: ItemDto[] = [];
      if (itemsArray && itemsArray.items.length > 0) {
        await prisma.items.createMany({
          data: itemsArray.items,
        });

        throw new HttpException("Test", HttpStatus.CONFLICT);
        newItems = await prisma.items.findMany({});
        return newItems;
      }
      return [];
    } catch (error) {
      console.error("Error in createItems service", error);
      throw error
    }
  }


  private async updateItems(itemsArray: UpdateItemArrayDto, prisma: PrismaService): Promise<UpdateItemDto[]> {
    try {
      const updatedItems: UpdateItemDto[] = [];

      for (const item of itemsArray.items) {
        const existingItem = await prisma.items.findUnique({
          where: { id: item.id },
        });

        if (!existingItem) {
          throw new NotFoundException(`Item with id ${item.id} not found`);
        }

        const updatedItem = await prisma.items.update({
          where: { id: item.id },
          data: item,
        });

        updatedItems.push(updatedItem);
      }

      return updatedItems;
    } catch (error) {
      console.error("Error in updateItems service", error);
      throw error;
    }
  }


  private async deleteItems(itemIds: number[], prisma: PrismaService): Promise<number[]> {
    try {
      if (itemIds && itemIds.length > 0) {
        await prisma.items.deleteMany({
          where: {
            id: { in: itemIds },
          },
        });
        return itemIds;
      }
      return [];
    } catch (error) {
      console.error("Error in deleteItems service", error);
      throw error;
    }
  }
}
