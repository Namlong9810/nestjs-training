import {
  IsDateString,
  IsInt,
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
  @Min(10)
  email: string;

  @IsNotEmpty()
  @IsInt()
  @Min(18)
  age: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @IsOptional()
  address: string;
}
