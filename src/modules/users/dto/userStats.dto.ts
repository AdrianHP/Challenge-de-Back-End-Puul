import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
export class UserStats {
  @ApiProperty()
  completedTasksCount: number;
  @ApiProperty()
  totalTasksCost: number;
  @ApiProperty()
  user: User;
}
