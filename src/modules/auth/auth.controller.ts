import { UserService } from '../user/user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/auth.decorator';
import { CreateUserDTO } from 'src/modules/user/dto/createUser.dto';
import { SkipInterceptor } from 'src/decorator/skip-interceptor.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Auth Controller
 * @author namhm
 * @version 1.0
 * @since 2025-02-16
*/
@ApiTags('Auth')
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
  @ApiOperation({ summary: 'User login', description: 'Authenticate user and return an access token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'Namlong9810' },
        password: { type: 'string', example: 'Namlong_9810' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful', schema: { example: { access_token: 'your_jwt_token' } } })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Public()
  @SkipInterceptor()
  @Post('login')
  async login(@Body() loginDTO: Record<string, any>) {
    return await this.authService.login(loginDTO.username, loginDTO.password);
  }

  /**
   * Get user profile
   * @body request data
   * @return user obj
   */
  @ApiOperation({ summary: 'Get user profile', description: 'Retrieve currently authenticated user data' })
  @ApiResponse({
    status: 200,
    description: 'Returns user profile',
    schema: {
      example: {
          "sub": "5a2f5c93-432f-4238-b371-34882bcf369c",
          "username": "Namlong9810",
          "role": "ADMIN",
          "iat": 1740322942,
          "exp": 1740330142
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('profile')
  @SkipInterceptor()
  getProfile(@Request() req) {
    return req.user;
  }

  /**
   * Register account
   * @body user data to obj
   * @return user obj
   */
  @ApiOperation({ summary: 'Register new user', description: 'Create a new account and return user data' })
  @ApiResponse({ status: 201, description: 'User registered successfully', 
    schema: {
      example: {
        'timestamp': "2025-02-23T15:06:21.138Z",
        "message": "Register successfully",
        "data": {
            "username": "Nhulong9810",
            "email": "taotennam1@gmail.com",
            "password": "$2b$12$SiPBcvEbQIMSnDucosdDHeOltdhXXcKGzK4riNQPHtHNz/vFyMaba",
            "id": "b38399a6-63f4-4695-86c9-e00d1abdcd6f",
            "roles": "STUDENT"
          }
        }
      }
 })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @Public()
  @Post('register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    return {
      message: 'Register successfully',
      data: await this.userService.register(createUserDTO),
    };
  }
}
