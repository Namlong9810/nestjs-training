import { IsInt, IsOptional } from 'class-validator';

export class UpdateCourse {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsInt()
  credit: number;
}
