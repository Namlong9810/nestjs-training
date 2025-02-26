import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

/**
 * DTO create new user
 * @author namhm
 * @version 1.0
 * @since 2021-05-16
 */
export class CreateUserDTO {
  @ApiProperty({
    example: 'Namlong9810',
    description: 'User name must contain at least 1 Up case and 1 number',
  })
  @IsNotEmpty()
  @Matches(/\d/, { message: 'Username must include at least 1 number' })
  @Matches(/[A-Z]/, { message: 'Username must include at least 1 Upcase char' })
  username: string;

  @ApiProperty({
    example: 'namlong9810@gmail.com',
    description: 'User email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Namlong@9810',
    description: 'Password must be at least 8 characters long and include 1 number, 1 uppercase letter, and 1 special character.',
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password required at least 8 chars' })
  @Matches(/\d/, { message: 'password must include at least 1 number' })
  @Matches(/[A-Z]/, { message: 'Password must include at least 1 Upcase char' })
  @Matches(/[@!@#$%^&*?_]/, {
    message: 'Password must Include at least 1 special char',
  })
  password: string;
}
