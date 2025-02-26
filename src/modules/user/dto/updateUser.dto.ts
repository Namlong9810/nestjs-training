import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'src/modules/auth/enums/roles.enum';

/**
 * DTO update user
 * @author namhm 
 * @version 1.0
 * @since 2021-05-16
 */
export class UpdateUserDTO {
  @ApiPropertyOptional({
    example: 'Namlong9810@gmail.com',
    description: 'Change your email(Optional)',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: 'Honhulong@9810',
    description: 'Change user password(Optional) ',
  })
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
