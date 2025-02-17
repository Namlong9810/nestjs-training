import { IsOptional } from 'class-validator';

export class UpdateEnrollmentDTO {
  @IsOptional()
  semester: string;

  @IsOptional()
  grade: number;
}
