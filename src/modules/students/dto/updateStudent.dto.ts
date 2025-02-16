import { IsDateString, IsInt, IsOptional, MaxLength, Min, min } from "class-validator";

export class UpdateStudentDTO{
    @IsOptional()
    @MaxLength(255)
    name: string;

    @IsOptional()
    @Min(10)
    email?: string;

    @IsOptional()
    @IsInt()
    @Min(18)
    age?: string;

    @IsOptional()
    @IsDateString()
    dob?: string;

    @IsOptional()
    address?: string;
}