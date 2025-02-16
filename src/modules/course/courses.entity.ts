import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('course')
export class Course{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 255})
    name: string;

    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({type: 'int'})
    credit: number;
    
}