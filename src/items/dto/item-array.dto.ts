// src/items/dto/create-item-array.dto.ts

import { IsArray, ArrayMinSize, ArrayMaxSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemDto } from './item.dto';

export class ItemArrayDto {
    @IsArray({ message: 'Items should be an array' })
    @ArrayMinSize(1, { message: 'At least 1 items are required' })
    @ValidateNested({ each: true, message: 'item should be a valid ItemDto' })
    @Type(() => ItemDto)
    items: ItemDto[];
}
