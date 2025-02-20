import { Roles } from 'src/decorator/roles.decorator';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpire: false,
      secretOrKey: 'your_secret_key',
    });
  }

  async validate(payload: any) {
    console.log(payload.username);
    console.log(payload.role);
    return { username: payload.username, role: payload.role };
  }
}
