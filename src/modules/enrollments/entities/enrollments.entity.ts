import { Max, Min, min } from 'class-validator';
import { Course } from 'src/modules/course/Entities/courses.entity';
import { Student } from 'src/modules/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Enrollment entity
 * @author namhm
 * @version 1.0
 * @since 2025-02-16
 */
@Entity('enrollment')
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  student_id: string;

  @Column('uuid')
  course_id: string;

  @Column({ length: 10 })
  semester: string;

  @Column({ nullable: true })
  @Min(1)
  @Max(100)
  grade: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Student, (student) => student.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => Course, (course) => course.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  course: Course;
}
