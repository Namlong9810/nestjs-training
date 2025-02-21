import { RolesGuard } from 'src/guard/roles.guard';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { CourseModule } from './modules/course/courses.modules';
import { StudentModules } from './modules/students/student.module';
import { EnrollmentModule } from './modules/enrollments/enrollments.module';
import { DatabaseModules } from './database/database.modules';
import { ResponseObject } from './Interceptor/responseObject.interceptor';

@Module({
  imports: [
    DatabaseModules,
    AuthModule,
    CourseModule,
    StudentModules,
    UserModule,
    EnrollmentModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseObject,
    },
  ],
})
export class AppModule {}
