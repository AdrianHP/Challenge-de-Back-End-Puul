import { Role } from '@prisma/client';
import { ITraceable } from 'src/common/interfaces/traceable';
import { Exclude } from 'class-transformer';

export class User implements ITraceable {
  id: number;
  name: string;
  email: string;
  role: Role;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  completedTasksCount?: number;
  totalTasksCost?: number;
}
