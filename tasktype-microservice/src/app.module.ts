import { Module } from '@nestjs/common';
import { TasktypesModule } from './tasktypes/tasktypes.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-project'),
    TasktypesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
