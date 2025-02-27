import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksStatisticsService } from './services/task-statistics.service';
import { TasksController } from './controller/task.controller';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksStatisticsService],
})
export class TasksModule {}
