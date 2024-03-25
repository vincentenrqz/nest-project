import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { AssignRoleDto, CreateUserDto, UpdateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return await this.userModel.find().populate('role');
  }

  async createUser(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    return await createUser.save();
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    return await user;
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async assignRole(id: string, assignRoleDto: AssignRoleDto) {
    const findUser = this.userModel.findByIdAndUpdate(
      id,
      { role: assignRoleDto.role },
      { new: true },
    );

    return await findUser;
  }
}
