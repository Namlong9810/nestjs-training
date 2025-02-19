import { Equals, IsNotEmpty } from 'class-validator';

export class ChangePassDTO {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  @Equals('newPassword', {
    message: 'Confirm password does not match New password',
  })
  confirmPassword: string;
}
