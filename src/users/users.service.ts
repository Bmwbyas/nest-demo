import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { RolesService } from "../roles/roles.service";

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
}
