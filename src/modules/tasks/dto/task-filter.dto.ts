import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dueDateStart?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dueDateEnd?: string;

  @ApiProperty({ required: false, example: 'abc-123-uuid' })
  @IsOptional()
  @IsUUID('4')
  assignedUserId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  assignedUserName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  assignedUserEmail?: string;
}
