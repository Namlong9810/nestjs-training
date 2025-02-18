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
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

@Controller('enrollment')
@UseGuards(RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true }))
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  /* đăng kí môn học cho sinh viên */
  @Post()
  @Roles(Role.Admin, Role.Student, Role.Teacher)
  create(@Body() createEnrollmentDTO: CreateEnrollmentDTO) {
    return this.enrollmentService.create(createEnrollmentDTO);
  }

  /* Lấy danh sách các môn học của 1 sinh viên */
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
  updateStudentScore(@Param('id') id: string, updateEnrollmentDTO: UpdateEnrollmentDTO) {
    return this.enrollmentService.updateStudentScore(id,updateEnrollmentDTO);
  }

  /* Hủy đăng kí môn học */
  @Delete(':id')
  cancelCourse(@Param('id') id: string) {
    return this.enrollmentService.cancelCourse(id);
  }
}
