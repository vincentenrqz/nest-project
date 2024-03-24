import { Module } from '@nestjs/common';
import { TasktypesService } from './tasktypes.service';
import { TasktypesController } from './tasktypes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskType, TaskTypeSchema } from './schemas/tasktype.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TaskType.name,
        schema: TaskTypeSchema,
      },
    ]),
  ],
  controllers: [TasktypesController],
  providers: [TasktypesService],
})
export class TasktypesModule {}
