import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";


interface PostCreationAttrs {
  title: string;
  content: string;
  userId:number;
  image:string;
}

@Table({ tableName: "posts" })
export class CurrentPost extends Model<CurrentPost, PostCreationAttrs> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ForeignKey(()=>User)
  @Column({ type: DataType.INTEGER})
  content: number;


  @Column({ type: DataType.STRING })
  image:string

  @Column({type: DataType.INTEGER})
  userId:number

  @BelongsTo(()=>User)
  author:User
}
