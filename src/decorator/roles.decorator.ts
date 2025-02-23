import { SetMetadata } from '@nestjs/common';
import { Role } from '../modules/auth/enums/roles.enum';
export const ROLE_KEYS = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEYS, roles);
