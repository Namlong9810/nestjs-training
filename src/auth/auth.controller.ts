import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){};
    private readonly logger: Logger;

    @Post('login')
    async login(@Body() body: {username: string, password: string}){
        const user  = await this.authService.validateUser(body.username, body.password);
        this.logger.log('Receive login request');
        
        return this.authService.login(user);
    }
}
