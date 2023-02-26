import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User)
              private userRepository: typeof User,
              private roleService: RolesService
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user=await this.userRepository.create(dto);
    const role=await this.roleService.getRoleByValue("USER")
    await user.$set('roles',[role.id])
    user.roles=[role]
    return user
  }

  async getAllUsers(): Promise<User[]> {
    // тут взяты данные пользователей еще и с ролью include:{all:true}
    return await this.userRepository.findAll({include:{all:true}});
  }

  async removeUser(id): Promise<void> {
    const deletedUser = await this.userRepository.findOne(id);
    await deletedUser.destroy();

  }

  async updateUser(id: any, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);
    await user.update(id, updateDto);
    return user;
  }
  async getUserByEmail(email:string){
    return this.userRepository.findOne({where:{email}, include:{all:true}})
  }

  async addRole(addRoleDto:AddRoleDto){
    const user = await this.userRepository.findByPk(addRoleDto.useId)
    const role = await this.roleService.getRoleByValue(addRoleDto.value)
    if (role&&user){
      await user.$add('role',role.id)
      return addRoleDto
    }

    throw new HttpException('user or id not found', HttpStatus.NOT_FOUND)
  }

  async bannedUser(dto:BanUserDto){
    const user = await this.userRepository.findByPk(dto.useId)
    if(!user){
      throw new HttpException('user  not found', HttpStatus.NOT_FOUND)
    }
    user.banned=true
    user.banReason=dto.banReason
    await user.save();
    return user
  }
}
