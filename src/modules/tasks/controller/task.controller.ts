import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { TasksStatisticsService } from '../services/task-statistics.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskFilterDto } from '../dto/task-filter.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskStatisticsDto } from '../dto/task-statistics.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly taskStatisticsService: TasksStatisticsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks with filters' })
  @ApiResponse({
    status: 200,
    description: 'Return the tasks based on filters.',
  })
  findAll(@Query() filters: TaskFilterDto) {
    return this.tasksService.findAll(filters);
  }

  @Get('Statistics')
  @ApiOperation({ summary: 'Get task Statistics' })
  @ApiResponse({
    status: 200,
    description: 'Return task Statistics data.',
    type: TaskStatisticsDto,
  })
  getStatistics() {
    return this.taskStatisticsService.getTaskStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a tasks by id' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
