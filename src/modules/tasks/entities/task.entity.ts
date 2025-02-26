import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ITraceable } from 'src/common/interfaces/traceable';

export class Task implements ITraceable {
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  hourEstimate: number;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty({
    enum: TaskStatus,
    example: 'ACTIVE',
  })
  status: TaskStatus;

  @ApiProperty()
  monetaryCost: number;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  users?: any[];
}
