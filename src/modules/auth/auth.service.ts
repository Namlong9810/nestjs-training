import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcryptjs';

/**
 * Auth service
 * @author namhm
 * @version 1.0
 * @since 2025-02-16
  */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    const hashPassword = user.password;

    const validatePassword = await Bcrypt.compare(password, hashPassword);

    if (!validatePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username, role: user.roles };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
