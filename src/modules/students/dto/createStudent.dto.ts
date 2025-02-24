import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateStudentDTO {
  @ApiProperty({
    example: 'Ho Nhu Long',
    description: 'Full name of the student (max 255 characters)',
  })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'NhuLong9810@example.com',
    description: 'Student email (optional)',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '0981898266',
    description: 'Phone number (max 10 characters)',
  })
  @IsNotEmpty()
  @MaxLength(10)
  phone: string;

  @ApiProperty({
    example: '2000-01-13',
    description: 'Date of birth (ISO format: YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @ApiPropertyOptional({
    example: 'To 10, Ngoc Thuy, Long Bien, Ha Noi',
    description: 'Student address (optional)',
  })
  @IsOptional()
  address?: string;
}
