import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaQuery } from 'src/common/filters/prisma-query.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserFilterDto } from '../dto/user-filter.dto';
import { User } from '../entities/user.entity';
import { UserStats } from '../dto/userStats.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with filters and task statistics' })
  @ApiOperation({ summary: 'Get all users with optional filters' })
  @ApiOkResponse({
    description: 'Users retrieved successfully.',
    type: UserStats,
  })
  findAll(@Query() filters: UserFilterDto) {
    return this.usersService.findAll(filters);
  }
}
