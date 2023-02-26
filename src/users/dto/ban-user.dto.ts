import { ApiProperty } from "@nestjs/swagger";

export  class BanUserDto{
  @ApiProperty({example:'ban for checkmate ', description:'value role user'})
  readonly banReason:string
  @ApiProperty({example:'1234', description:'id user added role'})
  readonly useId:number
}
