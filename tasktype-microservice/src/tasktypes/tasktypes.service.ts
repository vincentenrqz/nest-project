import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskType } from './schemas/tasktype.schema';
import { Model } from 'mongoose';
import { CreateTaskTypeDto } from './dtos/tasktype.dto';

@Injectable()
export class TasktypesService {
  constructor(
    @InjectModel(TaskType.name) private taskTypeModel: Model<TaskType>,
  ) {}

  async createTaskType(taskTypeDto: CreateTaskTypeDto) {
    const createTaskType = new this.taskTypeModel(taskTypeDto);
    try {
      const result = await createTaskType.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTaskTypes() {
    return await this.taskTypeModel.find();
  }
}
