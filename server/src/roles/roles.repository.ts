import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schemas/roles.schema';
import { Model } from 'mongoose';
import { RoleDto } from './dtos/roles.dto';

@Injectable()
export class RolesRepository {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async getRoles() {
    return this.roleModel.find();
  }

  async createRole(roleDto: RoleDto) {
    const newRole = new this.roleModel(roleDto);
    return await newRole.save();
  }

  async getRoleById(id: string) {
    return await this.roleModel.findById(id);
  }

  async updateRole(id: string, roleDto: RoleDto) {
    const updateRole = this.roleModel.findByIdAndUpdate(id, roleDto, {
      new: true,
    });

    return await updateRole;
  }

  async deleteRole(id: string) {
    return await this.roleModel.findByIdAndDelete(id);
  }
}
