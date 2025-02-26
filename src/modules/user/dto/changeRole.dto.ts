import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/modules/auth/enums/roles.enum';

/**
 * DTO change role
 * @author namhm
 * @version 1.0
 * @since 2021-05-16
 */
export class ChangeRoleDTO {
  @ApiProperty({
    example: 'STUDENT',
    description: 'Change User role',
  })
  @IsNotEmpty()
  roles: Role;
}
