import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  MaxLength,
  Min,
  min,
} from 'class-validator';

export class UpdateStudentDTO {

  @ApiPropertyOptional({
      example: 'Ho Nhu Long',
      description: 'Full name of the student (max 255 characters)',
    })
  @IsOptional()
  @MaxLength(255)
  name: string;

   @ApiPropertyOptional({
      example: 'NhuLong9810@example.com',
      description: 'Student email (optional)',
    })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
      example: '0981898266',
      description: 'Phone number (max 10 characters)',
    })
  @IsOptional()
  @MaxLength(10)
  phone?: string;

  @ApiPropertyOptional({
      example: '2000-01-13',
      description: 'Date of birth (ISO format: YYYY-MM-DD)',
    })
  @IsOptional()
  @IsDateString()
  dob?: string;
  
  @ApiPropertyOptional({
    example: 'To 10, Ngoc Thuy, Long Bien, Ha Noi',
    description: 'Student address (optional)',
  })
  @IsOptional()
  address?: string;
}
