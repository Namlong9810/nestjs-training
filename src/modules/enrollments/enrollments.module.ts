import { Course } from './../course/Entities/courses.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollments.entity';
import { EnrollmentController } from './enrollments.controller';
import { EnrollmentService } from './enrollments.service';
import { Student } from '../students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Course, Student])],
  exports: [TypeOrmModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
