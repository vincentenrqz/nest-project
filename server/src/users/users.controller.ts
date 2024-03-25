import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssignRoleDto, CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import mongoose from 'mongoose';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 404);
    const userId = await this.userService.getUserById(id);
    if (!userId) throw new HttpException('User id not found', 404);
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 404);
    const userId = await this.userService.updateUser(id, updateUserDto);
    if (!userId) throw new HttpException('User id not found', 404);
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 404);
    const userId = await this.userService.deleteUser(id);
    if (!userId) throw new HttpException('User id not found', 404);
    return this.userService.deleteUser(id);
  }

  @Patch('/assign-role/:id')
  async assignRole(@Param('id') id: string, @Body() assignRole: AssignRoleDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid id', 404);
    const userId = await this.userService.assignRole(id, assignRole);
    if (!userId) throw new HttpException('Role id not found', 404);
    return this.userService.assignRole(id, assignRole);
  }
}
