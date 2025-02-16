import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Student } from '../../students/entities/student.entity';
import { Course } from '../../course/courses.entity';

@Entity('enrollment')
export class Enrollment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    student_id: string;

    @Column('uuid')
    course_id: string;

    @Column({length: 10})
    semester: string;

    @Column({type: 'float', nullable: true})
    grade: number;
}