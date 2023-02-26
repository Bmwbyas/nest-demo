import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export  class CreateUserDto{
  @ApiProperty({example:'as@mail.ru', description:'email'})
  @IsString({message:'value string'})
  @IsEmail({},{message:'invalid email'})
  readonly email:string

  @ApiProperty({example:'1234', description:'password'})
  @Length(4,16,{message:'password min 4 symbol max 16 symbol'})
  readonly password:string
}
