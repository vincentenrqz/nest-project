import { Inject, Injectable } from '@nestjs/common';
import { TaskTypeDto } from './dtos/tasktypes.dto';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class TasktypesService {
  constructor(@Inject('TASKTYPE_SERVICE') private rabbitClient: ClientProxy) {}

  createTaskType(createTaskType: TaskTypeDto) {
    this.rabbitClient
      .emit({ cmd: 'create-tasktype' }, createTaskType)
      .pipe(timeout(5000));
    return { message: 'A task type is to be created through queue' };
  }

  getTasks() {
    return this.rabbitClient
      .send({ cmd: 'get-tasktypes' }, {})
      .pipe(timeout(5000));
  }
}
