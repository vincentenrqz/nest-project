import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TaskTypeDocument = TaskType & Document;

@Schema()
export class TaskType {
  @Prop({ required: true })
  name: string;
}

export const TaskTypeSchema = SchemaFactory.createForClass(TaskType);
