import { IsNotEmpty, IsOptional, IsUUID, Max, MaxLength, Min } from 'class-validator';
import { Student } from './../../students/entities/student.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEnrollmentDTO {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Student UUID',
  })
  @IsNotEmpty()
  @IsUUID()
  student_id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Course UUID',
  })
  @IsNotEmpty()
  @IsUUID()
  course_id: string;


  @ApiProperty({
    example: 'Fall 2025',
    description: 'Semester',
  })
  @IsNotEmpty()
  semester: string;

  @ApiPropertyOptional({
    example: 85,
    description: 'Student score (Optional), value from 0 to 100',
  })
  @IsOptional()
  @Min(0)
  @Max(100)
  grade?: number;
}
