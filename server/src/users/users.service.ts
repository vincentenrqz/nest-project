import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AssignRoleDto, CreateUserDto, UpdateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepo: UsersRepository) {}

  getUsers() {
    return this.userRepo.getUsers();
  }

  createUser(createUserDto: CreateUserDto) {
    return this.userRepo.createUser(createUserDto);
  }

  getUserById(id: string) {
    return this.userRepo.getUserById(id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.updateUser(id, updateUserDto);
  }

  deleteUser(id: string) {
    return this.userRepo.deleteUser(id);
  }

  assignRole(id: string, assignRole: AssignRoleDto) {
    return this.userRepo.assignRole(id, assignRole);
  }

  findUserByEmail(email: string) {
    return this.userRepo.findUserByEmail(email);
  }

  signUp(email: string, password: string) {
    return this.userRepo.registerUser(email, password);
  }
}
