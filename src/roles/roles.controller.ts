import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/createRole.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "./roles.model";

@ApiTags('roles')
@Controller("roles")

export class RolesController {
  constructor(private roleServise: RolesService) {
  }

  @ApiOperation({summary:'create new role'})
  @ApiResponse({status:200,type:Role})
  @Post()
  async createRole(@Body() dto: CreateRoleDto) {
    return await this.roleServise.createRole(dto);
  }

  @ApiOperation({summary:'get current role'})
  @ApiResponse({status:200,type:Role})
  @Get("/:value")
  async getRoleByValue(@Param("value") value: string): Promise<Role> {
    return  this.roleServise.getRoleByValue(value);
  }

  @ApiOperation({summary:'get current role'})
  @ApiResponse({status:200,type:Role})
  @Get()
  async getRoles() {
    return await this.roleServise.getRoles();
  }
}
