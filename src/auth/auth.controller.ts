import { User } from './../user/user.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){};

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDTO: Record<string, any>){
        
        return this.authService.login(loginDTO.username , loginDTO.password);
    }

    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }
}
