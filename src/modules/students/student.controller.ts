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
import { Role } from 'src/auth/enums/roles.enum';

@Controller('student')
@UseGuards(AuthGuard('jwt'))
@UsePipes(new ValidationPipe({ whitelist: true }))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  /* create new student */
  @Post('')
  @Roles(Role.ADMIN, Role.TEACHER)
  create(@Body() createStudentDTO: CreateStudentDTO) {
    return this.studentService.create(createStudentDTO);
  }

  /* Get list students */
  @Get('')
  @Roles(Role.ADMIN, Role.TEACHER)
  findAll() {
    return this.studentService.findAll();
  }

  /* Update student information */
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStudentDTO: UpdateStudentDTO) {
    return this.studentService.update(id, updateStudentDTO);
  }

  /* Remove student info by id */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentService.remove(id);
  }

  /* search by id */
  @Get(':id')
  searchById(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentService.searchById(id);
  }
}
