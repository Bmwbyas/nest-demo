import { ApiProperty } from "@nestjs/swagger";

export  class AddRoleDto{
  @ApiProperty({example:'USER', description:'value role user'})
  readonly value:string
  @ApiProperty({example:'1234', description:'id user added role'})
  readonly useId:number
}
