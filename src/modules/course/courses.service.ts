import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './Entities/courses.entity';
import { Repository } from 'typeorm';
import { CreateNewCourseDTO } from './dto/createCourse';
import { NotFoundError } from 'rxjs';
import { UpdateCourse } from './dto/updateCourse.dto';
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async createCourse(createNewCourse: CreateNewCourseDTO): Promise<Course> {
    // validate Course's name

    const exist = await this.courseRepository.findOne({
      where: { name: createNewCourse.name },
    });

    if (exist) {
      throw new BadRequestException(
        `Course's name: ${createNewCourse.name} already `,
      );
    }

    const course = this.courseRepository.create(createNewCourse);

    return await this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async findByID(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });

    if (!course) {
      throw new NotFoundException(`Course with Id ${id} is not found`);
    }
    return course;
  }

  async update(id: string, updateCourseDTO: UpdateCourse): Promise<Course> {
    const result = await this.courseRepository.update(id, updateCourseDTO);

    if (!result) {
      throw new NotFoundException(`Not found Course with id ${id}`);
    }

    return await this.findByID(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.courseRepository.delete(id);
    console.log(result);
    if (!result) {
      throw new NotFoundException(`Not found Course with id ${id}`);
    }
  }
}
