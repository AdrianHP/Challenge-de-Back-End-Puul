import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
export class UserStats {
  @ApiProperty()
  user: User;
  @ApiProperty({
    description: 'The number of completed tasks by the user',
    example: 5,
  })
  completedTasksCount: number;
  @ApiProperty({
    description: 'The total cost of all completed tasks by the user',
    example: 1500,
  })
  totalTasksCost: number;
  constructor(user: User, completedTasksCount: number, totalTasksCost: number) {
    this.user = user;
    this.completedTasksCount = completedTasksCount;
    this.totalTasksCost = totalTasksCost;
  }
}
