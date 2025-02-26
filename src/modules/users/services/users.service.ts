import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/data/services/prisma.service';
import { PrismaQuery } from 'src/common/filters/prisma-query.dto';
import { TaskStatus } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserFilterDto } from '../dto/user-filter.dto';
import { UserStats } from '../dto/userStats.dto';

@Injectable()
export class UsersService {
  constructor(private dataSource: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.dataSource.user.create({
        data: createUserDto,
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(filters: UserFilterDto): Promise<{ users: UserStats[] }> {
    const where = {};

    if (filters.name) {
      where['name'] = { contains: filters.name, mode: 'insensitive' };
    }

    if (filters.email) {
      where['email'] = { contains: filters.email, mode: 'insensitive' };
    }

    if (filters.role) {
      where['role'] = filters.role;
    }
    const users = await this.dataSource.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        // Get completed tasks for the user
        const completedTasks = await this.dataSource.task.findMany({
          where: {
            status: 'COMPLETED',
            TaskUser: {
              some: {
                userId: user.id,
              },
            },
          },
        });

        const completedTasksCount = completedTasks.length;
        const totalTasksCost = completedTasks.reduce(
          (total, task) => total + task.monetaryCost,
          0,
        );

        return new UserStats(user, completedTasksCount, totalTasksCost);
      }),
    );
    return { users: usersWithStats };
  }
}
