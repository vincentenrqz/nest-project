import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { RoleDto } from './dtos/roles.dto';

@Injectable()
export class RolesService {
  constructor(private roleRepo: RolesRepository) {}

  getRoles() {
    return this.roleRepo.getRoles();
  }

  createRole(roleDto: RoleDto) {
    return this.roleRepo.createRole(roleDto);
  }

  getRoleById(id: string) {
    return this.roleRepo.getRoleById(id);
  }

  updateRoleById(id: string, roleDto: RoleDto) {
    return this.roleRepo.updateRole(id, roleDto);
  }

  deleteRole(id: string) {
    return this.roleRepo.deleteRole(id);
  }
}
