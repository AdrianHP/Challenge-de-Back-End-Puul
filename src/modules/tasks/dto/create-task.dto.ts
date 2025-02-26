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
import { TaskStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implement login feature' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Create authentication flow and UI components' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 4.5 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  hourEstimate: number;

  @ApiProperty({ example: '2025-03-15' })
  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @ApiProperty({ enum: TaskStatus, example: 'ACTIVE' })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ example: 350.0 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  monetaryCost: number;

  @ApiProperty({ example: ['uuid1', 'uuid2'], type: [String] })
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  assignedUsers: string[];
}
