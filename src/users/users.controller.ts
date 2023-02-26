import { Controller, Post, Body, Get, Delete, Param, Put, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { Roles } from "../auth/role-auth.decorator";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags('users')
@Controller("users")

export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary:'get all users'})
  @ApiResponse({status:200,type:[User]})
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @Get()
  async getAllUsers(){
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary:'create new user'})
  @ApiResponse({status:200,type:User})
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({summary:'delete user by id'})
  @ApiResponse({status:201 })
  @Delete(':id')
  async removeUser(@Param('id' )id:string ){
    return this.usersService.removeUser(+id)
  }

  @ApiOperation({summary:'update current user'})
  @ApiResponse({status:200,type:User})
  @Put(':id')
  async updateUser(
    @Param('id' )id:string,
    @Body() userDto: UpdateUserDto){
    return this.usersService.updateUser(+id,userDto)
  }

  @ApiOperation({summary:'add role'})
  @ApiResponse({status:200})
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @Post('/role')
  async addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({summary:'banned user'})
  @ApiResponse({status:200})
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @Post('/ban')
  async bannedUser(@Body() dto: BanUserDto) {
    return this.usersService.bannedUser(dto)
  }



}
