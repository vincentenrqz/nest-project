import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { TasktypesModule } from './tasktypes/tasktypes.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-project'),
    UsersModule,
    RolesModule,
    TasktypesModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
