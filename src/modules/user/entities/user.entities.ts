import { IsEmail } from 'class-validator';
import { Role } from 'src/modules/auth/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * User entity
 * @author namhm
 * @version 1.0
 * @since 2025-02-16
  */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.STUDENT })
  roles: Role;
}
