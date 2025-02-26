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
 * @version 1.0
 * @since 2025-02-16
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
  @ApiResponse({ status: 201, description: 'Course has been created',
    schema: {
      example: {
        "timestamp": "2025-02-24T09:37:48.683Z",
        "message": "Course has been created",
        "data": {
            "name": "Math",
            "description": "Math course",
            "credit": 3,
            "id": "90019710-a783-47b9-9498-31e8a8b6f436",
            "createdAt": "2025-02-24T02:37:48.611Z",
            "updatedAt": "2025-02-24T02:37:48.611Z"
        }
      }
    }
   })
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
  @ApiResponse({ status: 200, description: 'List of courses', 
    schema:{
      example: {
        "timestamp": "2025-02-24T09:45:17.857Z",
        "message": "Request successfully",
        "data": [
            {
                "id": "69121e56-5e7f-4387-8dd2-52ac40536429",
                "name": "Khóa học Nestjs",
                "description": "Khóa học Nestjs",
                "credit": 2,
                "createdAt": "2025-02-21T01:34:07.959Z",
                "updatedAt": "2025-02-21T01:34:07.959Z"
            },
            {
                "id": "90019710-a783-47b9-9498-31e8a8b6f436",
                "name": "Math",
                "description": "Math course",
                "credit": 3,
                "createdAt": "2025-02-24T02:37:48.611Z",
                "updatedAt": "2025-02-24T02:37:48.611Z"
            }
        ]
      }
    }
   })
  @Get()
  async findAll() {
    return { message: 'Get list Courses successfully', data: await this.courseService.findAll()};
  }

  /**
   * Get Course by id
   * @param id
   * @return Course data
   */
  @ApiOperation({ summary: 'Get course by ID', description: 'Retrieve course details by its ID' })
  @ApiResponse({ status: 200, description: 'Course details',
    schema: {
      example: {
        "timestamp": "2025-02-24T09:54:50.828Z",
        "message": "Request successfully",
        "data": {
            "id": "90019710-a783-47b9-9498-31e8a8b6f436",
            "name": "Math",
            "description": "Math course",
            "credit": 3,
            "createdAt": "2025-02-24T02:37:48.611Z",
            "updatedAt": "2025-02-24T02:37:48.611Z"
        }
    }
   }
})
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
  @ApiResponse({ status: 200, description: 'Course updated successfully' , 
    schema: {
      example: {
        "timestamp": "2025-02-24T09:51:10.254Z",
        "message": "Data updates successfully",
        "data": {
            "id": "69121e56-5e7f-4387-8dd2-52ac40536429",
            "name": "Advanced NestJs",
            "description": "Update new name of the course",
            "credit": 2,
            "createdAt": "2025-02-21T01:34:07.959Z",
            "updatedAt": "2025-02-24T02:51:10.159Z"
        }
      }
    }
  })
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
  @ApiResponse({ status: 200, description: 'Course removed successfully'})
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
