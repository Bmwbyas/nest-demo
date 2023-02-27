import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";

export  class CreatePostDto{
  @ApiProperty({example:'title ', description:'post title'})
  @IsString({message:'value string'})
  @IsEmail({},{message:'invalid email'})
  readonly title:string

  @ApiProperty({example:'this post about weather', description:'description post'})
  @MaxLength(16,{message:' max 16 symbol'})
  readonly content:string

  @ApiProperty({example:'2', description:'user id'})
  @IsNumber({},{message:'value string'})
  readonly userId:number

}
