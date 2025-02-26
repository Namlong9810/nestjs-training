import { Enrollment } from 'src/modules/enrollments/entities/enrollments.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Course entity
 * @author namhm
 * @version 1.0
 * @since 2025-02-16
  */
@Entity('course')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'int' })
  credit: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course_id)
  @JoinColumn()
  enrollment: Enrollment[];
}
