import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { StudentService } from './student.services';
import { CreateStudentDTO } from "./dto/createStudent.dto";
import { UpdateStudentDTO } from "./dto/updateStudent.dto";

@Controller('student')
@UsePipes(new ValidationPipe({whitelist: true}))
export class StudentController{
    constructor(private readonly studentService: StudentService){};

    /* create new student */
    @Post('')
    create(@Body() createStudentDTO: CreateStudentDTO){
        return this.studentService.create(createStudentDTO);
    }

    /* Get list students */
    @Get('')
    findAll(){
        return this.studentService.findAll();
    }

    /* Update student information */
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateStudentDTO: UpdateStudentDTO){
        return this.studentService.update(id, updateStudentDTO);
    }

    @Delete(':id')
    async remove(@Param('id') id: number){
        return this.studentService.remove(id);
    }

}