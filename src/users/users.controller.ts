import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUserDto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    await this.usersService.create(body.email, body.password);
  }

  //TODO findUser
  //TODO findAllUsers
  //TODO updateUser
  //TODO removeUser
}
