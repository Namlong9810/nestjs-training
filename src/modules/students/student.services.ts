import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import { CreateStudentDTO } from "./dto/createStudent.dto";
import { UpdateStudentDTO } from "./dto/updateStudent.dto";

@Injectable()
export class StudentService{
    constructor(
       @InjectRepository(Student)
       private readonly studentRepository: Repository<Student>  
    ){};

    async create(createStudentDTO: CreateStudentDTO): Promise<Student>{
        const student = this.studentRepository.create(createStudentDTO);
        return await this.studentRepository.save(student)
    }


    async findAll(): Promise<Student[]>{
        return await this.studentRepository.find();
    }

    async update(id: number, updateStudentDTO: UpdateStudentDTO): Promise<Student>{
        const result = await this.studentRepository.update(id, updateStudentDTO);
        if(result.affected === 0){
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
    }


    async remove(id: number): Promise<void>{
        const result =  await this.studentRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
    }
}