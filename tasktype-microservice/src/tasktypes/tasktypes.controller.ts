import { Controller } from '@nestjs/common';
import { TasktypesService } from './tasktypes.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateTaskTypeDto } from './dtos/tasktype.dto';

@Controller('tasktypes')
export class TasktypesController {
  constructor(private readonly tasktypesService: TasktypesService) {}

  @EventPattern({ cmd: 'create-tasktype' })
  createTaskType(
    @Payload() taskTypeDto: CreateTaskTypeDto,
    @Ctx() context: RmqContext,
  ) {
    console.log(context);
    return this.tasktypesService.createTaskType(taskTypeDto);
  }

  @MessagePattern({ cmd: 'get-tasktypes' })
  getTaskTypes() {
    return this.tasktypesService.getTaskTypes();
  }
}
