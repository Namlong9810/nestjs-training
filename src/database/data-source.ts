import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/modules/course/Entities/courses.entity';
import { Enrollment } from 'src/modules/enrollments/entities/enrollments.entity';
import { Student } from 'src/modules/students/entities/student.entity';
import { User } from 'src/modules/user/entities/user.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'student_management',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      entities: [Student, Course, Enrollment, User],
      // migrations:['.src/migrations/*.ts'], 
      synchronize: true,
      logging: false,
    }),
  ],
})
export class DatabaseModules {}
