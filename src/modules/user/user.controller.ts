import { UserService } from 'src/modules/user/user.service';
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
import { Role } from 'src/modules/auth/enums/roles.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { ChangePassDTO } from './dto/changePass.dto';
import { ChangeRoleDTO } from './dto/changeRole.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *  Find User
   * @param user id
   * @return user obj */
  @ApiOperation({ summary: 'Find user', description: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Get(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  async findUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findUser(id);
  }

  /** Update User
   * @param user id
   * @return status code
   */
  @ApiOperation({ summary: 'Update user', description: 'Update user information by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpdateUserDTO })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.userService.update(id, updateUserDTO);
  }

  /** Delete User
   * @param user id
   * @return status code
   */
  @ApiOperation({ summary: 'Delete user', description: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.delete(id);
  }

  /** Change User's password
   * @param user id
   * @body data to obj
   * @return status code
   */
  @ApiOperation({ summary: 'Change password', description: 'Change user password by ID' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid password' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: ChangePassDTO })
  @Put(':id/password')
  @Roles(Role.STUDENT, Role.TEACHER)
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changePassDTO: ChangePassDTO,
  ) {
    return await this.userService.updatePassword(id, changePassDTO);
  }

  /** Set role for User
   * @param user id
   * @body data to obj
   * @return status code
   */
  @ApiOperation({ summary: 'Set user role', description: 'Update user role by ID' })
  @ApiResponse({ status: 200, description: 'User role updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid role' })
  @ApiParam({ name: 'id', type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: ChangeRoleDTO })
  @Put(':id/role')
  @Roles(Role.ADMIN)
  async setRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeRoleDTO: ChangeRoleDTO,
  ) {
    return await this.userService.setRole(id, changeRoleDTO);
  }
}
