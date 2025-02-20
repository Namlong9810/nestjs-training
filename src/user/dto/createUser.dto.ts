import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @Matches(/\d/, { message: 'Username must include at least 1 number' })
  @Matches(/[A-Z]/, { message: 'Username must include at least 1 Upcase char' })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password required at least 8 chars' })
  @Matches(/\d/, { message: 'password must include at least 1 number' })
  @Matches(/[A-Z]/, { message: 'Password must include at least 1 Upcase char' })
  @Matches(/[@!@#$%^&*?_]/, {
    message: 'Password must Include at least 1 special char',
  })
  password: string;
}
