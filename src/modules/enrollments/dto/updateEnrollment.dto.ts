import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

/**
 * DTO update enrollment
 * @author namhm
 * @version 1.0
 * @since 2025-02-16
  */
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
