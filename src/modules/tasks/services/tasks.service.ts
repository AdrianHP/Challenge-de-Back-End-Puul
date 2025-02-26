import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/data/services/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskFilterDto } from '../dto/task-filter.dto';
import { TaskStatus } from '@prisma/client';
@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { assignedUsers, ...taskData } = createTaskDto;

    // Create the task
    const task = await this.prisma.task.create({
      data: {
        title: taskData.title,
        description: taskData.description || '',
        hourEstimate: taskData.hourEstimate,
        dueDate: new Date(taskData.dueDate),
        status: taskData.status || TaskStatus.ACTIVE,
        monetaryCost: taskData.monetaryCost,
      },
    });

    // Assign users to the task
    if (assignedUsers && assignedUsers.length > 0) {
      await Promise.all(
        assignedUsers.map((userId) =>
          this.prisma.taskUser.create({
            data: {
              taskId: task.id,
              userId,
            },
          }),
        ),
      );
    }

    // Return task with assigned users
    return this.findOne(task.id);
  }
  async findAll(filters: TaskFilterDto) {
    const {
      title,
      dueDate,
      assignedUserId,
      assignedUserName,
      assignedUserEmail,
    } = filters;

    // Build where clause
    const where: any = {};

    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }

    if (dueDate) {
      where.dueDate.lte = dueDate;
    }

    // Filter by assigned user
    if (assignedUserId || assignedUserName || assignedUserEmail) {
      where.TaskUser = {
        some: {},
      };

      if (assignedUserId) {
        where.TaskUser.some.userId = assignedUserId;
      }

      if (assignedUserName || assignedUserEmail) {
        where.TaskUser.some.user = {};

        if (assignedUserName) {
          where.TaskUser.some.user.name = {
            contains: assignedUserName,
            mode: 'insensitive',
          };
        }

        if (assignedUserEmail) {
          where.TaskUser.some.user.email = {
            contains: assignedUserEmail,
            mode: 'insensitive',
          };
        }
      }
    }

    // Get tasks with filters, ordered by creation date (newest first)
    return this.prisma.task.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        TaskUser: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        TaskUser: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    // Check if task exists
    await this.findOne(id);

    const { assignedUsers, ...taskData } = updateTaskDto;

    // Update task data
    await this.prisma.task.update({
      where: { id },
      data: {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
      },
    });

    // Update assigned users if provided
    if (assignedUsers) {
      // Remove all existing assignments
      await this.prisma.taskUser.deleteMany({
        where: { taskId: id },
      });

      // Create new assignments
      if (assignedUsers.length > 0) {
        await Promise.all(
          assignedUsers.map((userId) =>
            this.prisma.taskUser.create({
              data: {
                taskId: id,
                userId,
              },
            }),
          ),
        );
      }
    }

    // Return updated task
    return this.findOne(id);
  }

  async remove(id: string) {
    // Check if task exists
    await this.findOne(id);

    return this.prisma.task.delete({
      where: { id },
    });
  }
}
