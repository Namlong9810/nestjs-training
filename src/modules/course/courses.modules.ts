import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './Entities/courses.entity';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  exports: [TypeOrmModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
