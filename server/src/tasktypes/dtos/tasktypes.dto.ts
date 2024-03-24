import { IsNotEmpty, IsString } from 'class-validator';

export class TaskTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
