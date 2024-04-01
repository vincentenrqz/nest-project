import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose from 'mongoose';
import { Role } from 'src/roles/schemas/roles.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false, default: '' })
  firstName: string;

  @Prop({ required: false, default: '' })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: Role.name,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
