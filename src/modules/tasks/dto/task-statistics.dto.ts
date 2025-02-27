import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class TaskStatisticsDto {
  @ApiProperty({
    description: 'The total number of tasks',
    example: 10,
  })
  totalTasks: number;

  @ApiProperty({
    description: 'The total cost of all tasks',
    example: 1500,
  })
  totalTaskCost: number;

  @ApiProperty({
    description: 'The total estimated hours of all tasks',
    example: 50,
  })
  totalEstimatedHours: number;

  @ApiProperty({
    description: 'The number of completed tasks',
    example: 5,
  })
  completedTasksCount: number;
  @ApiProperty({
    description: 'The total cost of all completed tasks',
    example: 1500,
  })
  completedTasksCost: number;

  @ApiProperty({
    description: 'The total estimated hours of all completed tasks',
    example: 50,
  })
  completedTasksEstimatehours: number;

  @ApiProperty({
    description: 'The average task completion rate',
    example: [
      {
        completionRate: 0.5,
        totalTasks: 10,
        completedTasks: 5,
        activeTasks: 5,
      },
    ],
  })
  taskCompletionRate: {
    completionRate: number;
    totalTasks: number;
    completedTasks: number;
    activeTasks: number;
  };

  @ApiProperty({
    description: 'The average task completion rate by month',
    example: [
      {
        month: 'January',
        completionRate: 0.5,
        totalTasks: 10,
        completedTasks: 5,
        activeTasks: 5,
      },
    ],
  })
  taskcompletionRateByMonth: {
    month: string;
    completionRate: number;
    totalTasks: number;
    completedTasks: number;
    activeTasks: number;
  }[];

  @ApiProperty({
    description: 'The average task completion rate by user',
  })
  userEfficiency: {
    user: User;
    totalTasks: number;
    completedTasks: number;
    totalEstimatedHours: number;
    avgHoursPerTask: number;
    completionRatio: number;
  }[];

  constructor(
    totalTasks: number,
    totalTaskCost: number,
    totalEstimatedHours: number,
    completedTasksCount: number,
    completedTasksCost: number,
    completedTasksEstimatehours: number,
    taskCompletionRate: {
      completionRate: number;
      totalTasks: number;
      completedTasks: number;
      activeTasks: number;
    },
    taskcompletionRateByMonth: {
      month: string;
      completionRate: number;
      totalTasks: number;
      completedTasks: number;
      activeTasks: number;
    }[],
    userEfficiency: {
      user: User;
      totalTasks: number;
      completedTasks: number;
      totalEstimatedHours: number;
      avgHoursPerTask: number;
      completionRatio: number;
    }[],
  ) {
    this.totalTasks = totalTasks;
    this.totalTaskCost = totalTaskCost;
    this.totalEstimatedHours = totalEstimatedHours;
    this.completedTasksCount = completedTasksCount;
    this.completedTasksCost = completedTasksCost;
    this.completedTasksEstimatehours = completedTasksEstimatehours;
    this.taskCompletionRate = taskCompletionRate;
    this.taskcompletionRateByMonth = taskcompletionRateByMonth;
    this.userEfficiency = userEfficiency;
  }
}
