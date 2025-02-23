import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsNotEmpty } from 'class-validator';

export class ChangePassDTO {
  @ApiProperty({
    example: 'OldPass@9810',
    description: 'Your current pass',
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'NewPass@9810',
    description: 'New password',
  })
  @IsNotEmpty()
  newPassword: string;


  @ApiProperty({
    example: 'NewPass@9810',
    description: 'Confirm your new password',
  })
  @IsNotEmpty()
  @Equals('newPassword', {
    message: 'Confirm password does not match New password',
  })
  confirmPassword: string;
}
