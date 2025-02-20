import { Role } from 'src/auth/enums/roles.enum';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ROLE_KEYS } from 'src/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLE_KEYS, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole || requiredRole.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(requiredRole);
    console.log(user.role);

    if (!user.role) {
      throw new UnauthorizedException(
        "You don't have permission to access this request",
      );
    }

    const hasRole = requiredRole.some((role) => user.role.includes(role));

    if (!hasRole) {
      throw new UnauthorizedException(
        "You don't have permission to access this request",
      );
    } else return true;
  }
}
