import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateNewCourseDTO {
  @ApiProperty({
    example: 'Training Nodejs',
    description: 'The name of the course',
    maxLength: 255,
  })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'This course covers the basics of NestJS framework.',
    description: 'A brief description of the course',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 3,
    description: 'Number of credits for the course',
    minimum: 1,
  })
  @IsNotEmpty()
  @IsInt()
  credit: number;
}
