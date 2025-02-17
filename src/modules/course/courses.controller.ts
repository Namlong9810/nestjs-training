import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNewCourseDTO } from './dto/createCourse';
import { CourseService } from './courses.service';
import { Course } from './Entities/courses.entity';
import { UpdateCourse } from './dto/updateCourse.dto';

@Controller('courses')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  createNewCourse(@Body() createNewCourseDTO: CreateNewCourseDTO) {
    return this.courseService.createCourse(createNewCourseDTO);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findByID(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourse) {
    return this.courseService.update(id, updateCourseDTO);
  }

  @Delete(':id')
  remove(@Param('') id: string) {
    return this.courseService.remove(id);
  }
}
