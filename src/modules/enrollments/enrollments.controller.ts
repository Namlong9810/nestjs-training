import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EnrollmentService } from './enrollments.service';
import { CreateEnrollmentDTO } from './dto/createEnrollment.dto';
import { UpdateEnrollmentDTO } from './dto/updateEnrollment.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/modules/auth/enums/roles.enum';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Enrollment Service controller
 * @author: namhm
 */
@ApiTags('Enrollment')
@Controller('enrollment')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  /**
   * Create new enrollment
   * @body createEnrollmentDTO
   * @return Enrollment Object
   */
  @ApiOperation({ summary: 'Create new enrollment', description: 'Admins and Students can enroll in a course' })
  @ApiResponse({ status: 201, description: 'Enrollment has been created' ,
    schema: {
      example: {
        "timestamp": "2025-02-24T10:29:42.420Z",
        "message": "Enrollment has been created",
        "data": {
            "student_id": "6ddaffa8-51c9-4809-a11e-c8f5a4ca9f50",
            "course_id": "f577d7c4-961d-4740-927f-d1116f6c469f",
            "semester": "abcd",
            "grade": 10,
            "id": "9750b1a4-b5f6-4c7b-8d13-2e7f03c5437b",
            "createdAt": "2025-02-24T03:29:42.370Z",
            "updatedAt": "2025-02-24T03:29:42.370Z"
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiBody({ type: CreateEnrollmentDTO })
  @Post()
  @Roles(Role.ADMIN, Role.STUDENT)
  async create(@Body() createEnrollmentDTO: CreateEnrollmentDTO) {
    return {
      message: 'Enrollment has been created',
      data: await this.enrollmentService.create(createEnrollmentDTO),
    };
  }

  /**
   * Get list of courses group by Student'id
   * @Param student id
   * @return list Student Obj
   */
  @ApiOperation({ summary: 'Get courses by student ID', description: 'Retrieve a list of courses for a specific student' })
  @ApiResponse({ status: 200, description: 'List of courses', 
    schema: {
      example: {
        "timestamp": "2025-02-24T10:27:18.487Z",
        "message": "Request successfully",
        "data": [
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
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Get('student/:id/courses')
  async getList(@Param('id', ParseUUIDPipe) id: string) {
    return {
      message: 'Get list of Courses successfully ',
      data: await this.enrollmentService.getList(id),
    };
  }

  /**
   * Get list of student group by Course'id
   * @param id
   * @return list Course Obj
   */
  @ApiOperation({ summary: 'Get students by course ID', description: 'Retrieve a list of students for a specific course' })
  @ApiResponse({ status: 200, description: 'List of students',
    schema: {
      example: {
        "timestamp": "2025-02-24T10:24:48.760Z",
        "message": "Request successfully",
        "data": [
            {
                "id": "6ddaffa8-51c9-4809-a11e-c8f5a4ca9f50",
                "name": "Hồ Mạnh Nam",
                "email": "namlong9810@gmail.com",
                "phone": "0981898266",
                "dob": "2002-01-13",
                "address": null,
                "createdAt": "2025-02-24T03:08:32.443Z",
                "updatedAt": "2025-02-24T03:08:32.443Z"
            }
        ]
      }
    }
   })
  @ApiResponse({ status: 404, description: 'Course not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Get('course/:id/students')
  async getStudentByCourse(@Param('id', ParseUUIDPipe) id: string) {
    return {
      message: 'Get list of Students successfully ',
      data: await this.enrollmentService.getStudentsByCourse(id),
    };
  }

  /**
   * Update Course'Score by Student'id
   * @param student id
   * @body data to obj
   * @return status code
   */
  @ApiOperation({ summary: 'Update student score', description: 'Admins and Teachers can update scores' })
  @ApiResponse({ status: 200, description: 'Score updated successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpdateEnrollmentDTO })
  @Put(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  async updateStudentScore(
    @Param('id', ParseUUIDPipe) id: string,
    updateEnrollmentDTO: UpdateEnrollmentDTO,
  ) {
    return {
      message: 'Update score successfully',
      data: await this.enrollmentService.updateStudentScore(id, updateEnrollmentDTO),
    };
  }

  /** Cancel enrollment by enrollment id
   * @param enrollment id
   * @return status code
   */
  @ApiOperation({ summary: 'Cancel enrollment', description: 'Cancel an enrollment by ID' })
  @ApiResponse({ status: 200, description: 'Enrollment canceled successfully' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Delete(':id')
  @Delete(':id')
  async cancelCourse(@Param('id', ParseUUIDPipe) id: string) {
    return {
      message: 'Cancel enrollment successfully',
      data: await this.enrollmentService.cancelCourse(id),
    };
  }
}
