import { RolesGuard } from 'src/guard/roles.guard';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { CourseModule } from './modules/course/courses.modules';
import { StudentModules } from './modules/students/student.module';
import { EnrollmentModule } from './modules/enrollments/enrollments.module';
import { DatabaseModules } from './database/data-source';
import { ResponseObject } from './Interceptor/responseObject.interceptor';
import { HttpExceptionFilter } from './filter/exception.filter';

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
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule {}
