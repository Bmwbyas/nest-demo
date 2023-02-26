import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { UserRoles } from "./user-roles.model";


interface RoleCreationAttrs{
  value:string
  description:string
}

@Table({tableName:'roles'})
export class Role extends Model<Role,RoleCreationAttrs>{

  @ApiProperty({example:'1', description:'unique id'})
  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @ApiProperty({example:'ADMIN', description:'role user'})
  @Column({type:DataType.STRING, unique:true, allowNull:false})
  value:string

  @ApiProperty({example:'admin', description:'desc role'})
  @Column({type:DataType.STRING, allowNull:false})
  description:string

  @ApiProperty({ example: "[2,3]", description: " user id use current role" })
  @BelongsToMany(()=>User,()=>UserRoles)
  users:User[];

}
