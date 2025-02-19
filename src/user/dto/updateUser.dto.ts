import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/enums/roles.enum';

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MinLength(8, { message: 'Password required at least 8 chars' })
  @Matches(/\d/, { message: 'password must include at least 1 number' })
  @Matches(/[A-Z]/, { message: 'Password must include at least 1 Upcase char' })
  @Matches(/[@!@#$%^&*?_]/, {
    message: 'Password must Include at least 1 special char',
  })
  password: string;

  @IsEnum(Role)
  roles: Role;
}
