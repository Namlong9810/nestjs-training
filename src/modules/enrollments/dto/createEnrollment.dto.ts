import { IsNotEmpty, IsUUID } from 'class-validator';
import { Student } from './../../students/entities/student.entity';

export class CreateEnrollmentDTO {
  @IsNotEmpty()
  @IsUUID()
  student_id: string;

  @IsNotEmpty()
  @IsUUID()
  course_id: string;

  @IsNotEmpty()
  semester: string;

  @IsNotEmpty()
  grade: number;
}
