import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255})
    name: string;

    @Column({unique: true})
    email: string;

    @Column({length: 10})
    phone: string;

    @Column({type: 'date'})
    dob: string;

    @Column({type: 'text', nullable: true})
    address: string;
}
