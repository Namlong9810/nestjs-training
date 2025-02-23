import { ChangePassDTO } from './dto/changePass.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import * as Bcrypt from 'bcrypt';
import { ChangeRoleDTO } from './dto/changeRole.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async register(createUserDTO: CreateUserDTO): Promise<User> {
    console.log('Checking User');
    const existUser = await this.userRepository
      .createQueryBuilder()
      .where('username = :username', { username: createUserDTO.username })
      .orWhere('email = :email', { email: createUserDTO.email })
      .getOne();

    if (existUser) {
      console.log('🚨 User already exists! Throwing error.');
      throw new BadRequestException(
        'Your username or email already exist in database',
      );
    }

    const hashPassword = await Bcrypt.hash(createUserDTO.password, 12);

    const user = this.userRepository.create({
      ...createUserDTO,
      password: hashPassword,
    });

    return await this.userRepository.save(user);
  }

  async findUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDTO: UpdateUserDTO): Promise<void> {
    const result = await this.userRepository.update(id, updateUserDTO);

    if (!result) {
      throw new NotFoundException(`Not found User with id ${id}`);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (!result) {
      throw new NotFoundException(`Can not found User with id ${id} to remove`);
    }
  }

  async updatePassword(
    id: string,
    changePassDTO: ChangePassDTO,
  ): Promise<void> {
    // Kiểm tra và lấy pass trong db
    const user = await this.findUser(id);

    const validatePass = Bcrypt.compare(
      changePassDTO.oldPassword,
      user.password,
    );

    if (!validatePass) {
      throw new BadRequestException(
        `Your password does not match. pls try again!!`,
      );
    }

    //hash pass và update vào db
    const hashPassword = Bcrypt.hash(changePassDTO.newPassword, 10);
    const result = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: hashPassword })
      // .where('id = :id', {id})
      .where({ id })
      .execute();

    if (!result) {
      throw new NotFoundException(
        `Can not not found User with id ${id} to update`,
      );
    }
  }

  async setRole(id: string, changeRoleDTO: ChangeRoleDTO): Promise<void> {
    const user = await this.findUser(id);

    const result = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ roles: changeRoleDTO.roles })
      .where({ id })
      .execute();
  }
}
