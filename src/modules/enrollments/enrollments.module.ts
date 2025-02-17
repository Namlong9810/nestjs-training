import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Enrollment } from "./entities/enrollments.entity";
import { EnrollmentController } from "./enrollments.controller";
import { EnrollmentService } from "./enrollments.service";

@Module({
    imports: [TypeOrmModule.forFeature([Enrollment])],
    exports: [TypeOrmModule],
    controllers: [EnrollmentController],
    providers:  [EnrollmentService]
})
export class EnrollmentCourse{};