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
import { TaskStatus } from '@prisma/client';

export class TaskFilterDto {
  @ApiProperty({ required: false, example: 'Task Name' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, example: '2025-03-15' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({
    enum: TaskStatus,
    example: 'ACTIVE',
    required: false,
  })
  @IsOptional()
  status: TaskStatus;

  @ApiProperty({ required: false, example: 'abc-123-uuid' })
  @IsOptional()
  @IsUUID('4')
  assignedUserId?: string;

  @ApiProperty({ required: false, example: 'Adrian' })
  @IsOptional()
  @IsString()
  assignedUserName?: string;

  @ApiProperty({ required: false, example: 'add@example.com' })
  @IsOptional()
  @IsString()
  assignedUserEmail?: string;
}
