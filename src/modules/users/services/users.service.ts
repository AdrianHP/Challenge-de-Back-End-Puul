import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/data/services/prisma.service';
import { PrismaQuery } from 'src/common/filters/prisma-query.dto';
import { TaskStatus } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private dataSource: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.dataSource.user.create({
      data: createUserDto,
    });
  }

  async findAll(query: PrismaQuery) {
    const users = await this.dataSource.user.findMany({
      where: query.filters,
      orderBy: query.sorts,
      skip: query.skip ?? query.page! * query.pageSize!,
      take: query.take ?? query.pageSize,
    });
    // For each user, get stats about completed tasks
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        // Count completed tasks
        const completedTasksCount = await this.dataSource.taskUser.count({
          where: {
            userId: user.id,
            task: {
              status: TaskStatus.COMPLETED,
            },
          },
        });

        // Sum cost of all completed tasks
        const completedTasksCost = await this.dataSource.task.aggregate({
          where: {
            status: TaskStatus.COMPLETED,
            TaskUser: {
              some: {
                userId: user.id,
              },
            },
          },
          _sum: {
            monetaryCost: true,
          },
        });

        return {
          ...user,
          completedTasksCount,
          totalTasksCost: completedTasksCost._sum.monetaryCost || 0,
        };
      }),
    );

    return usersWithStats;
  }
}
