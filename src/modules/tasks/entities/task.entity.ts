import { TaskStatus } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ITraceable } from 'src/common/interfaces/traceable';

export class Task implements ITraceable {
  id: number;
  title: string;
  description?: string;
  hourEstimate: number;
  dueDate: Date;
  status: TaskStatus;
  monetaryCost: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  users?: any[];
}
