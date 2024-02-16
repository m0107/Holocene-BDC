// src/items/dto/create-item.dto.ts

import { IsString, IsInt, IsBoolean, IsOptional, IsPositive, IsNotEmpty } from 'class-validator';

export class ItemDto {

    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly color: string;

    @IsNotEmpty()
    @IsInt()
    readonly length: number;

    @IsNotEmpty()
    @IsInt()
    readonly width: number;

    @IsNotEmpty()
    @IsInt()
    readonly height: number;

    @IsNotEmpty()
    @IsInt()
    readonly weight: number;

    @IsNotEmpty()
    @IsInt()
    readonly qty: number;

    @IsOptional()
    @IsBoolean()
    readonly stackable?: boolean;

    @IsOptional()
    @IsBoolean()
    readonly tiltable?: boolean;
}
