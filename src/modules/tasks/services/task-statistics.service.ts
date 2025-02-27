import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/data/services/prisma.service';
import { TaskStatisticsDto } from '../dto/task-statistics.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskFilterDto } from '../dto/task-filter.dto';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TasksStatisticsService {
  constructor(private prisma: PrismaService) {}

  async getTaskStatistics() {
    let totalTaskCost = 0;
    let totalTaskEstimateHours = 0;
    let completedTasks = 0;
    let completedTaskCost = 0;
    let completedTaskEstimateHours = 0;
    let activeTasks = 0;

    const tasks = await this.prisma.task.findMany();
    const totalTasksCount = tasks.length;

    const monthsData = {};
    tasks.forEach((task) => {
      const month = task.createdAt.toISOString().slice(0, 7); // YYYY-MM format

      if (!monthsData[month]) {
        monthsData[month] = {
          completed: 0,
          active: 0,
        };
      }

      if (task.status === TaskStatus.COMPLETED) {
        monthsData[month].completed += 1;
        completedTasks += 1;
        completedTaskCost += task.monetaryCost;
        completedTaskEstimateHours += task.hourEstimate;
      } else {
        monthsData[month].active += 1;
        activeTasks += 1;
      }

      totalTaskCost += task.monetaryCost;
      totalTaskEstimateHours += task.hourEstimate;
    });

    const taskCompletionRate = {
      completionRate: completedTasks / totalTasksCount,
      totalTasks: totalTasksCount,
      completedTasks: completedTasks,
      activeTasks: activeTasks,
    };

    const taskcompletionRateByMonth = Object.entries(monthsData).map(
      ([month, data]: [string, any]) => {
        const total = data.completed + data.active;
        const completionRate = total > 0 ? (data.completed / total) * 100 : 0;

        return {
          month,
          completionRate: parseFloat(completionRate.toFixed(2)),
          totalTasks: total,
          completedTasks: data.completed,
          activeTasks: data.active,
        };
      },
    );

    const userEfficiency = await this.getUserEfficiency();

    return new TaskStatisticsDto(
      totalTasksCount,
      totalTaskCost,
      totalTaskEstimateHours,
      completedTasks,
      completedTaskCost,
      completedTaskEstimateHours,
      taskCompletionRate,
      taskcompletionRateByMonth,
      userEfficiency,
    );
  }

  private async getUserEfficiency() {
    // Get users with their assigned tasks
    const users = await this.prisma.user.findMany({
      include: {
        TaskUser: true,
      },
    });

    const userStatistics = await Promise.all(
      users.map(async (user) => {
        const completedTasks = await this.prisma.task.findMany({
          where: {
            status: 'COMPLETED',
            TaskUser: {
              some: {
                userId: user.id,
              },
            },
          },
        });

        const totalEstimatedHours = completedTasks.reduce(
          (sum, task) => sum + task.hourEstimate,
          0,
        );

        const avgHoursPerTask =
          completedTasks.length > 0
            ? totalEstimatedHours / completedTasks.length
            : 0;

        const completionRatio =
          completedTasks.length > 0
            ? completedTasks.length / user.TaskUser.length
            : 0;

        return {
          user: user,
          name: user.name,
          totalTasks: user.TaskUser.length,
          completedTasks: completedTasks.length,
          totalEstimatedHours: totalEstimatedHours,
          avgHoursPerTask: parseFloat(avgHoursPerTask.toFixed(2)),
          completionRatio: parseFloat((completionRatio * 100).toFixed(2)),
        };
      }),
    );
    return userStatistics;
  }
}
