
import { Role } from './../auth/enums/roles.enum';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ROLE_KEYS } from 'src/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){};

    canActivate(context: ExecutionContext): boolean{
        const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLE_KEYS, [
            context.getHandler(),
            context.getClass(),
        ]);


        if(!requiredRole){
            return true;
        }

        const {user} = context.switchToHttp().getRequest();
        return requiredRole.some((role) => user.roles?.include(role));
    }
}