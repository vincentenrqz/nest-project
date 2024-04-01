import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { AssignRoleDto, CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return await this.userModel.find().populate('role');
  }

  async createUser(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;

    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });

    return await createUser.save();
  }

  async registerUser(email: string, password: string) {
    const user = new this.userModel({ email, password });
    return await user.save();
  }

  async getUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });

    return user;
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

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
