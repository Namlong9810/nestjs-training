import { IsNotEmpty } from "class-validator";
import { Role } from "src/auth/enums/roles.enum";

export class ChangeRoleDTO{
    @IsNotEmpty()
    roles: Role;
}