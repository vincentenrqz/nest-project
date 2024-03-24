import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasktypesService } from './tasktypes.service';
import { TaskTypeDto } from './dtos/tasktypes.dto';

@Controller('tasktypes')
export class TasktypesController {
  constructor(private taskTypeService: TasktypesService) {}

  @Get()
  getTaskTypes() {
    return this.taskTypeService.getTasks();
  }

  @Post()
  createTaskType(@Body() createTaskType: TaskTypeDto) {
    return this.taskTypeService.createTaskType(createTaskType);
  }
}
