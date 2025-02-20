import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

@Controller('courses')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(Role.ADMIN)
  createNewCourse(@Body() createNewCourseDTO: CreateNewCourseDTO) {
    return this.courseService.createCourse(createNewCourseDTO);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseService.findByID(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCourseDTO: UpdateCourse) {
    return this.courseService.update(id, updateCourseDTO);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('') id: string) {
    return this.courseService.remove(id);
  }
}
