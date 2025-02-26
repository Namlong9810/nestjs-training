import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/constants';
import { UserService } from 'src/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entities';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}
