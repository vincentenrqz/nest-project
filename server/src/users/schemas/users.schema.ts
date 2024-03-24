import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { Role } from 'src/roles/schemas/roles.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  @IsNotEmpty()
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: Role.name,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
