import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateEnrollmentDTO {
  @ApiPropertyOptional({
      example: 'Summer 2025',
      description: 'Semester',
    })
  @IsOptional()
  semester?: string;

  @ApiPropertyOptional({
      example: 80,
      description: 'Student Score'
  })
  @IsOptional()
  grade?: number;
}
