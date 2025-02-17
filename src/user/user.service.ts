import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    username: string;
    password: string;
    role: 'student' | 'admin' | 'teacher';
};

@Injectable()
export class UserService {
    private users: User[] = [
        { id: 1, username: 'admin1', password: 'admin123', role: 'admin'},
    ];

    async findOne(username: string): Promise<User | undefined>{
        return this.users.find(user => user.username === username);
    }
}
