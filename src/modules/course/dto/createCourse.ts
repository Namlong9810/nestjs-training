import { IsInt, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateNewCourseDTO {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  credits: number;
}
