import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  //   registerUser(email: string, password: string) {
  //     const findUser = this.usersService.getUserById();
  //   }

  async signUp(email: string, password: string) {
    const users = await this.usersService.findUserByEmail(email);

    if (users) {
      throw new BadRequestException('Email already exists');
    }

    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = this.usersService.signUp(email, hashedPassword);
    return user;
  }
}
