import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dtos/roles.dto';

@Controller('roles')
@UsePipes(new ValidationPipe())
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }

  @Post()
  createRole(@Body() roleDto: RoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @Get('/:id')
  getRoleById(@Param('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  @Put('/:id')
  updateRole(@Param('id') id: string, @Body() roleDto: RoleDto) {
    return this.roleService.updateRoleById(id, roleDto);
  }

  @Delete('/:id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
