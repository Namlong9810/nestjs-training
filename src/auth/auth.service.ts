import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){};

    async validateUser(username: string, password: string): Promise<any>{
        const user =  await this.userService.findOne(username);

        if(user && user.password === password){
            const {password, ...result} = user;
            return result;
        }

        throw new UnauthorizedException('Invalid credentials');
    }

    /* Tạo jwt nếu đăng nhập thành công */
    async login(user: any){
        const payload = { username: user.username, role: user.role};

        return {
            access_token: this.jwtService.sign(payload),
        };
    }


}
