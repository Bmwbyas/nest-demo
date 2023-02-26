import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(private jwtSersice:JwtService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    const req=context.switchToHttp().getRequest()
    try{
      const authHeader=req.headers.authorization
      const bearer=authHeader.split( ' ')[0]
      const token=authHeader.split( ' ')[1]
      if (bearer!=='Bearer'||!token){
        throw new UnauthorizedException({message:'unautorize'})
      }
      const user=this.jwtSersice.verify(token)
      req.user=user
      return true
    }
    catch (e) {
      throw new UnauthorizedException({message:'unautorize'})
    }
  }
}
