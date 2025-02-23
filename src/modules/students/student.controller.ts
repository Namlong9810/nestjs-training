import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from './student.services';
import { CreateStudentDTO } from './dto/createStudent.dto';
import { UpdateStudentDTO } from './dto/updateStudent.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/modules/auth/enums/roles.enum';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiResponse({ status: 201, description: 'Student has been created' })
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
  @ApiResponse({ status: 200, description: 'List of students' })
  @Get('')
  @Roles(Role.ADMIN, Role.TEACHER)
  findAll() {
    return { message: '', data: this.studentService.findAll() };
  }

  /** Update student information
   * @param student id
   * @body data to obj
   * @return student data
   */
  @ApiOperation({ summary: 'Update student information', description: 'Update student details' })
  @ApiResponse({ status: 200, description: 'Student data updated successfully' })
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
  @ApiResponse({ status: 200, description: 'Student found successfully' })
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
