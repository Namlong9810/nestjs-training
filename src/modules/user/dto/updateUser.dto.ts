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

  @IsOptional()
  @IsEnum(Role)
  roles: Role;
}
