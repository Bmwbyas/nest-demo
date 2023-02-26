import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {

  @ApiProperty({example:'ADMIN', description:'role user'})
  @IsString({message:'value should be string'})
  readonly value: string;

  @ApiProperty({example:'admin have many responsibility', description:'description role'})
  @IsString({message:'value should be string'})
  readonly description: string;

}
