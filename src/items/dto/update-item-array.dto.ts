import { PartialType } from '@nestjs/mapped-types';
import { ItemArrayDto } from './item-array.dto';

export class UpdateItemArrayDto extends PartialType(ItemArrayDto) { }
