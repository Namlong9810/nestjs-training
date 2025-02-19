import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  @Roles(Role.Admin, Role.Student)
  create(@Body() createEnrollmentDTO: CreateEnrollmentDTO) {
    return this.enrollmentService.create(createEnrollmentDTO);
  }

  /**
   * Get list of enrollment
   * @Param
   */
  @Get('student/:id/courses')
  getList(@Param('id') id: string) {
    return this.enrollmentService.getList(id);
  }

  /* Lấy danh sách sinh viên của 1 môn học */
  @Get('course/:id/students')
  getStudentByCourse(@Param('id') id: string) {
    return this.enrollmentService.getStudentsByCourse(id);
  }

  /* Cập nhật điểm số cho sinh viên */
  @Put(':id')
  @Roles(Role.Admin, Role.Teacher)
  updateStudentScore(
    @Param('id') id: string,
    updateEnrollmentDTO: UpdateEnrollmentDTO,
  ) {
    return this.enrollmentService.updateStudentScore(id, updateEnrollmentDTO);
  }

  /* Hủy đăng kí môn học */
  @Delete(':id')
  cancelCourse(@Param('id') id: string) {
    return this.enrollmentService.cancelCourse(id);
  }
}
