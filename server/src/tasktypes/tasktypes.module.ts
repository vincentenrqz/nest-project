import { Module } from '@nestjs/common';
import { TasktypesController } from './tasktypes.controller';
import { TasktypesService } from './tasktypes.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASKTYPE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'tasktype-queue',
        },
      },
    ]),
  ],
  controllers: [TasktypesController],
  providers: [TasktypesService],
})
export class TasktypesModule {}
