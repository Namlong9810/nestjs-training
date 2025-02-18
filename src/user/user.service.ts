import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/roles.enum';

export type User = {
    id: number;
    username: string;
    password: string;
    roles: any;
};

@Injectable()
export class UserService {
    private users: User[] = [
        { id: 1, username: 'admin1', password: 'admin123', roles: Role.Admin},
        { id: 2, username: 'user1', password: 'user123', roles: Role.Student},
        { id: 3, username: 'teacher1', password: 'teacher123', roles: Role.Teacher}
    ];

    async findOne(username: string): Promise<User | undefined>{
        return this.users.find(user => user.username === username);
    }
}
