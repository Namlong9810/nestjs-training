import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './modules/students/entities/student.entity';
import { Course } from './modules/course/courses.entity';
import { Enrollment } from './modules/enrollments/entities/enrollments.entity';

@Module({
  imports: [
    // cấu hình typeOrm kết nối db 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'student_management',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Student, Course, Enrollment]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
