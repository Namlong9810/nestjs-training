import { UserService } from 'src/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { Role } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { ChangePassDTO } from './dto/changePass.dto';
import { ChangeRoleDTO } from './dto/changeRole.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* Find User */
  @Get(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  findUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findUser(id);
  }

  /* Update User */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return this.userService.update(id, updateUserDTO);
  }

  /* Delete User */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }

  /* Change User's password */
  @Put(':id/password')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.STUDENT, Role.TEACHER)
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changePassDTO: ChangePassDTO,
  ) {
    return this.userService.updatePassword(id, changePassDTO);
  }

  /* Set role for User */
  @Put(':id/role')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  setRole(@Param('id', ParseUUIDPipe) id: string, @Body() changeRoleDTO: ChangeRoleDTO){
    return this.userService.setRole(id, changeRoleDTO);
  }
}
