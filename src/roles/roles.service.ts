import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/createRole.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./roles.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository:typeof Role) {}


  async createRole( dto:CreateRoleDto){
      return  this.roleRepository.create(dto)
  }

  async getRoleByValue(value:string){
    return  this.roleRepository.findOne({where:{value}})
  }

  async getRoles(){
    return this.roleRepository.findAll()
  }
}
