import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from './student.services';
import { CreateStudentDTO } from './dto/createStudent.dto';
import { UpdateStudentDTO } from './dto/updateStudent.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/modules/auth/enums/roles.enum';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Student controller
 * @author namhm
 * @version 1.0
 * @since 2025-02-16
 */
@ApiTags('Student')
@Controller('student')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  /** Create a new student
   * @body data to obj
   * @return student data
   */
  @ApiOperation({ summary: 'Create new student', description: 'Admins and Teachers can create a new student' })
  @ApiResponse({ status: 201, description: 'Student has been created',
    schema: {
      example: {
        "timestamp": "2025-02-24T09:59:30.072Z",
        "message": "Student has been created",
        "data": {
            "name": "Hồ Mạnh Nam",
            "email": "namlong9810@gmail.com",
            "phone": "0981898266",
            "dob": "2002-01-13",
            "address": null,
            "id": "bbc6458b-4089-4241-bd42-b21b4f23a79e",
            "createdAt": "2025-02-24T02:59:30.004Z",
            "updatedAt": "2025-02-24T02:59:30.004Z"
        }
      }
    }
   })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiBody({ type: CreateStudentDTO })
  @Post('')
  @Roles(Role.ADMIN, Role.TEACHER)
  async create(@Body() createStudentDTO: CreateStudentDTO) {
    return {
      message: 'Student has been created',
      data: await this.studentService.create(createStudentDTO),
    };
  }

  /** Get list students
   * @return list students data
   */
  @ApiOperation({ summary: 'Get list of students', description: 'Retrieve all students' })
  @ApiResponse({ status: 200, description: 'List of students',
    schema: {
      example: {
        "timestamp": "2025-02-24T10:01:07.502Z",
        "message": "Request successfully",
        "data": [
            {
                "id": "bbc6458b-4089-4241-bd42-b21b4f23a79e",
                "name": "Hồ Mạnh Nam",
                "email": "namlong9810@gmail.com",
                "phone": "0981898266",
                "dob": "2002-01-13",
                "address": null,
                "createdAt": "2025-02-24T02:59:30.004Z",
                "updatedAt": "2025-02-24T02:59:30.004Z"
            }
        ]
      }
    }
   })
  @Get('')
  @Roles(Role.ADMIN, Role.TEACHER)
  async findAll() {
    return { message: '', data: await this.studentService.findAll() };
  }

  /** Update student information
   * @param student id
   * @body data to obj
   * @return student data
   */
  @ApiOperation({ summary: 'Update student information', description: 'Update student details' })
  @ApiResponse({ status: 200, description: 'Student data updated successfully', 
    schema: {
      example: {
        "timestamp": "2025-02-24T10:04:34.808Z",
        "message": "Update student data successfully",
        "data": {
            "id": "bbc6458b-4089-4241-bd42-b21b4f23a79e",
            "name": "Ho Nhu Long",
            "email": "nhulong9810@gmail.com",
            "phone": "0981898266",
            "dob": "2007-06-23",
            "address": "So 54, To 10, Ngoc Thuy, Long Bien, Ha Noi",
            "createdAt": "2025-02-24T02:59:30.004Z",
            "updatedAt": "2025-02-24T03:04:34.712Z"
        }
      }
  }
})
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpdateStudentDTO })
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudentDTO: UpdateStudentDTO,
  ) {
    return {
      message: 'Update student data successfully',
      data: await this.studentService.update(id, updateStudentDTO),
    };
  }

  /**
   * Remove student info by id
   * @param student id
   * @return status code */
  @ApiOperation({ summary: 'Delete student', description: 'Delete student by ID' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return {
      message: 'Delete student successfully',
      data: await this.studentService.remove(id),
    };
  }

  /** Search by id
   * @param student id
   * @return student data
   */
  @ApiOperation({ summary: 'Search student by ID', description: 'Retrieve student details by ID' })
  @ApiResponse({ status: 200, description: 'Student found successfully' ,
    schema: {
      example: {
        "timestamp": "2025-02-24T10:08:56.116Z",
        "message": "Delete student successfully",
        "data": {
            "id": "6ddaffa8-51c9-4809-a11e-c8f5a4ca9f50",
            "name": "Hồ Mạnh Nam",
            "email": "namlong9810@gmail.com",
            "phone": "0981898266",
            "dob": "2002-01-13",
            "address": null,
            "createdAt": "2025-02-24T03:08:32.443Z",
            "updatedAt": "2025-02-24T03:08:32.443Z"
        }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Get(':id')
  async searchById(@Param('id', ParseUUIDPipe) id: string) {
    return {
      message: 'Delete student successfully',
      data: await this.studentService.searchById(id),
    };
  }
}
