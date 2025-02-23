import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/modules/auth/enums/roles.enum';

export class ChangeRoleDTO {
  @ApiProperty({
    example: 'STUDENT',
    description: 'Change User role',
  })
  @IsNotEmpty()
  roles: Role;
}
