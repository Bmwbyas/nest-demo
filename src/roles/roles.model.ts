
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";


interface UserCreationAttrs{
  email:string
  password:string
}

@Table({tableName:'users'})
export class User extends Model<User,UserCreationAttrs>{

  @ApiProperty({example:'1', description:'unique id'})
  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey:true})
  id:number

  @ApiProperty({example:'as@mail.ru', description:'email'})
  @Column({type:DataType.STRING, unique:true, allowNull:false})
  email:string

  @ApiProperty({example:'1234', description:'password'})
  @Column({type:DataType.STRING, allowNull:false})
  password:string

  @ApiProperty({example:'true', description:'isBanned user'})
  @Column({type:DataType.BOOLEAN, defaultValue:false })
  banned:boolean

  @ApiProperty({example:'error', description:'errors value'})
  @Column({type:DataType.STRING, allowNull:true })
  banReason:string
}
