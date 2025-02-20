import { RolesGuard } from 'src/guard/roles.guard';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './modules/students/entities/student.entity';
import { Course } from './modules/course/Entities/courses.entity';
import { Enrollment } from './modules/enrollments/entities/enrollments.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { CourseModule } from './modules/course/courses.modules';
import { StudentModules } from './modules/students/student.module';
import { EnrollmentModule } from './modules/enrollments/enrollments.module';
import { User } from './user/entities/user.entities';

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
    TypeOrmModule.forFeature([Student, Course, Enrollment, User]),
    AuthModule,
    CourseModule,
    StudentModules,
    UserModule,
    EnrollmentModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  //  ]
})
export class AppModule {}
