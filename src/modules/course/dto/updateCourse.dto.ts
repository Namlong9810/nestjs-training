import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateCourse {
  @ApiPropertyOptional({
    example: 'Advanced NestJS',
    description: 'Update new name of the course (optional)',
    maxLength: 255,
  })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    example: 'This course covers advanced topics in NestJS framework.',
    description: 'Updated description of the course (optional)',
  })
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    example: 4,
    description: 'Updated number of credits for the course (optional)',
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  credit: number;
}
