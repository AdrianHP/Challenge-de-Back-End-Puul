import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class PrismaQuery {
  @IsObject()
  @IsOptional()
  filters: any;
  @IsArray()
  sorts: any[];
  @ValidateIf((o) => o.skip !== undefined && o.skip !== null)
  @IsNumber()
  take?: number;
  @ValidateIf((o) => o.take !== undefined && o.take !== null)
  @IsNumber()
  skip?: number;
  @ValidateIf((o) => o.pageSize !== undefined && o.pageSize !== null)
  @IsNumber()
  page?: number;
  @ValidateIf((o) => o.page !== undefined && o.page !== null)
  @IsNumber()
  pageSize?: number;
}
