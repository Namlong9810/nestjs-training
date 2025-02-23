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
import { UpdateCourse } from './dto/updateCourse.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/modules/auth/enums/roles.enum';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


/**
 * Courses controller
 * @author namhm
 */
@ApiTags('Course')
@Controller('courses')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   * Create new course
   * @body data to obj
   * @return Course
   */
  @ApiOperation({ summary: 'Create new course', description: 'Only Admins can create a new course' })
  @ApiResponse({ status: 201, description: 'Course has been created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiBody({ type: CreateNewCourseDTO })
  @Post()
  @Roles(Role.ADMIN)
  async createNewCourse(@Body() createNewCourseDTO: CreateNewCourseDTO) {
    return {
      message: 'Course has been created',
      data: await this.courseService.createCourse(createNewCourseDTO),
    };
  }

  /**
   * Get list Courses
   * @return list Course from tbl Course
   */
  @ApiOperation({ summary: 'Get all courses', description: 'Retrieve all courses from the database' })
  @ApiResponse({ status: 200, description: 'List of courses' })
  @Get()
  findAll() {
    return  this.courseService.findAll();
  }

  /**
   * Get Course by id
   * @param id
   * @return Course data
   */
  @ApiOperation({ summary: 'Get course by ID', description: 'Retrieve course details by its ID' })
  @ApiResponse({ status: 200, description: 'Course details' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return { message: '', data: await this.courseService.findByID(id) };
  }

  /**
   * Update Course data
   * @param course id
   * @body data to obj
   * @return this course data
   */
  @ApiOperation({ summary: 'Update course', description: 'Only Admins can update a course' })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpdateCourse })
  @Put(':id')
  @Roles(Role.ADMIN)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDTO: UpdateCourse,
  ) {
    return {
      message: 'Data updates successfully',
      data: await this.courseService.update(id, updateCourseDTO),
    };
  }

  /**
   * Delete Course data
   * @param id
   * @return status code
   *
   */
  @ApiOperation({ summary: 'Delete course', description: 'Only Admins can delete a course' })
  @ApiResponse({ status: 200, description: 'Course removed successfully' })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id', ParseArrayPipe) id: string) {
    return {
      message: 'Data removes successfully',
      data: await this.courseService.remove(id),
    };
  }
}
