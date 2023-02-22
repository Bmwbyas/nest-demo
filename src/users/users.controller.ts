import { Controller, Post, Body, Get, Delete, Param, Put } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";

@ApiTags('users')
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {
  }
  @ApiOperation({summary:'get all users'})
  @ApiResponse({status:200,type:[User]})
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
}
