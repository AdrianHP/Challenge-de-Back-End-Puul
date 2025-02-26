import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { filter } from 'rxjs';

export class PrismaQuery {
  @ApiProperty({ required: false, example: [{ property: 'filter' }] })
  @IsObject()
  @IsOptional()
  filters: any;

  @ApiProperty({ required: false, example: [{ id: 'asc' }] })
  @IsOptional()
  @IsArray()
  sorts: any[];

  @ApiProperty({ required: false, example: 20 })
  @ValidateIf((o) => o.skip !== undefined && o.skip !== null)
  @IsNumber()
  take?: number;

  @ApiProperty({ required: false, example: 0 })
  @ValidateIf((o) => o.take !== undefined && o.take !== null)
  @IsNumber()
  skip?: number;

  @ApiProperty({ required: false, example: 0 })
  @ValidateIf((o) => o.pageSize !== undefined && o.pageSize !== null)
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false, example: 20 })
  @ValidateIf((o) => o.page !== undefined && o.page !== null)
  @IsNumber()
  pageSize?: number;
}
