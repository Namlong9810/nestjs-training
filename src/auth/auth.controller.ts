import { UserService } from './../user/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/auth.decorator';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { SkipInterceptor } from 'src/decorator/skip-interceptor.decorator';

/**
 * Auth Controller
 * @author namhm
 * */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  /**
   * Login
   * @body login data to obj
   * @return access token
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @SkipInterceptor()
  @Post('login')
  async login(@Body() loginDTO: Record<string, any>) {
    return this.authService.login(loginDTO.username, loginDTO.password);
  }

  /**
   * Get user profile
   * @body request data
   * @return user obj
   */
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /**
   * Register account
   * @body user data to obj
   * @return user obj
   */
  @Public()
  @Post('register')
  register(@Body() createUserDTO: CreateUserDTO) {
    return {
      message: 'Register successfully',
      data: this.userService.register(createUserDTO),
    };
  }
}
