import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNewCourseDTO } from './dto/createCourse';
import { CourseService } from './courses.service';
import { Course } from './Entities/courses.entity';
import { UpdateCourse } from './dto/updateCourse.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { SkipInterceptor } from 'src/decorator/skip-interceptor.decorator';

/**
 * Courses controller
 * @author namhm
 */
@Controller('courses')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   * Create new course
   * @body data to obj
   * @return Course
   */
  @Post()
  @Roles(Role.ADMIN)
  createNewCourse(@Body() createNewCourseDTO: CreateNewCourseDTO) {
    return {
      message: 'Course has been created',
      data: this.courseService.createCourse(createNewCourseDTO),
    };
  }

  /**
   * Get list Courses
   * @return list Course from tbl Course
   */
  @Get()
  @SkipInterceptor()
  findAll() {
    return  this.courseService.findAll();
  }

  /**
   * Get Course by id
   * @param id
   * @return Course data
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return { message: '', data: this.courseService.findByID(id) };
  }

  /**
   * Update Course data
   * @param course id
   * @body data to obj
   * @return this course data
   */
  @Put(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDTO: UpdateCourse,
  ) {
    return {
      message: 'Data updates successfully',
      data: this.courseService.update(id, updateCourseDTO),
    };
  }

  /**
   * Delete Course data
   * @param id
   * @return status code
   *
   */
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseArrayPipe) id: string) {
    return {
      message: 'Data removes successfully',
      data: this.courseService.remove(id),
    };
  }
}
