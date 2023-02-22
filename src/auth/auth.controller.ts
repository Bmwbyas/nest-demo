import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authServise:AuthService) {
  }

  @Post('/login')
  async login(@Body() userDto:CreateUserDto){
    return this.authServise.login(userDto)
  }

  @Post('/registration')
  async registration (@Body() userDto:CreateUserDto){
    return this.authServise.registration(userDto)
  }
}
