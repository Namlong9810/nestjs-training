import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateStudentDTO {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(9)
  phone: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @IsOptional()
  address?: string;
}
