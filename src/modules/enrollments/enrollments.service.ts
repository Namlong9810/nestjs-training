import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollments.entity';
import { Course } from '../course/Entities/courses.entity';
import { Student } from '../students/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateEnrollmentDTO } from './dto/createEnrollment.dto';
import { UpdateEnrollmentDTO } from './dto/updateEnrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,

    @InjectRepository(Course)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Student)
    private readonly courseRepository: Repository<Course>,
  ) {}
  async create(createEnrollment: CreateEnrollmentDTO): Promise<Enrollment> {
    const student_id = createEnrollment.student_id;
    const course_id = createEnrollment.course_id;

    const result1 = await this.studentRepository.findOne({
      where: { id: student_id },
    });

    const result2 = await this.courseRepository.findOne({
      where: { id: course_id },
    });

    if (!result1 || !result2) {
      if (!result1) {
        throw new NotFoundException(`Not found Student with ID ${student_id}`);
      } else if (!result2) {
        throw new NotFoundException(`Not found Course with ID ${course_id}`);
      }
    }

    const enrollment = this.enrollmentRepository.create(createEnrollment);

    return enrollment;
  }

  async getList(id: string): Promise<Course[]> {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .innerJoin('enrollment', 'enrollment', 'enrollment.course_id = course.id')
      .where('enrollment.student_id = :id', { id })
      .getMany();

    if (courses.length === 0) {
      throw new NotFoundException(
        `Can not find any course with student id ${id} `,
      );
    }

    return courses;
  }

  async getStudentsByCourse(id: string): Promise<Student[]> {
    const students = await this.studentRepository
      .createQueryBuilder('student')
      .innerJoin('enrollment', 'enrollment', 'enrolment.course_id = student.id')
      .where('enrollment.course_id = :id', { id })
      .getMany();

    if (students.length === 0) {
      throw new NotFoundException(`Can not find any student with `);
    }
    return students;
  }

  async updateStudentScore(
    id: string,
    updateEnrollmentDTO: UpdateEnrollmentDTO,
  ): Promise<void> {
    const update = await this.enrollmentRepository.update(
      id,
      updateEnrollmentDTO,
    );

    if (update.affected === 0) {
      throw new NotFoundException(`Can not found student with ID ${id}`);
    }
  }

  async cancelCourse(id: string): Promise<void> {
    const result = await this.enrollmentRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException(`Can not find Enrollment with id ${id}`);
    }
  }
}
