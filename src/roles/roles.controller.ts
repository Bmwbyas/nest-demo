import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/createRole.dto";

@Controller("roles")
export class RolesController {
  constructor(private roleServise: RolesService) {
  }

  @Post()
  async createRole(@Body() dto: CreateRoleDto) {
    return await this.roleServise.createRole(dto);
  }

  @Get("/:value")
  async getRoleByValue(@Param("value") value: string) {
    return await this.roleServise.getRoleByValue(value);
  }
}
