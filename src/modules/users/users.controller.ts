import { Controller, Get } from '@nestjs/common';
import { UsersService } from '@/src/modules/users/users.service';
import { User } from '@/src/entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
