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
import { Role } from 'src/auth/enums/roles.enum';

/**
 * Enrollment Service controller
 * @author: namhm
 */
@Controller('enrollment')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  /**
   * Create new enrollment
   * @body createEnrollmentDTO
   * @return Enrollment Object
   */
  @Post()
  @Roles(Role.ADMIN, Role.STUDENT)
  create(@Body() createEnrollmentDTO: CreateEnrollmentDTO) {
    return this.enrollmentService.create(createEnrollmentDTO);
  }

  /**
   * Get list of courses group by Student'id
   * @Param student id
   * @return list Student Obj
   */
  @Get('student/:id/courses')
  getList(@Param('id', ParseUUIDPipe) id: string) {
    return this.enrollmentService.getList(id);
  }

  /**
   * Get list of student group by Course'id
   * @param id
   * @return list Course Obj
   */
  @Get('course/:id/students')
  getStudentByCourse(@Param('id', ParseUUIDPipe) id: string) {
    return this.enrollmentService.getStudentsByCourse(id);
  }

  /**
   * Update Course'Score by Student'id
   * @param student id
   * @body data to obj
   * @return status code
   */
  @Put(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  updateStudentScore(
    @Param('id', ParseUUIDPipe) id: string,
    updateEnrollmentDTO: UpdateEnrollmentDTO,
  ) {
    return this.enrollmentService.updateStudentScore(id, updateEnrollmentDTO);
  }

  /** Cancel enrollment by enrollment id
   * @param enrollment id
   * @return status code
   */
  @Delete(':id')
  cancelCourse(@Param('id', ParseUUIDPipe) id: string) {
    return this.enrollmentService.cancelCourse(id);
  }
}
