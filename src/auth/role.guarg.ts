import { CanActivate, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./role-auth.decorator";

@Injectable()
export class RoleGuarg implements CanActivate{
  constructor(private jwtSersice:JwtService,
              private reflector:Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{

    try{
      const requiredRoles=this.reflector.getAllAndOverride(ROLES_KEY,[
        context.getHandler(),
        context.getClass(),
      ])
      if (!requiredRoles){
        return true
      }
      const req=context.switchToHttp().getRequest()
      const authHeader=req.headers.authorization
      const bearer=authHeader.split( ' ')[0]
      const token=authHeader.split( ' ')[1]
      if (bearer!=='Bearer'||!token){
        throw new UnauthorizedException({message:'unautorize'})
      }
      const user=this.jwtSersice.verify(token)
      req.user=user
      return user.roles.some(role=>requiredRoles.includes(role.value))
    }
    catch (e) {
      throw new HttpException('no access',HttpStatus.FORBIDDEN)
    }
  }
}
