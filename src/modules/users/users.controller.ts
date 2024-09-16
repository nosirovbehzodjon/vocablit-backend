import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '@/src/modules/users/users.service';
import { User } from '@/src/entities/users.entity';
import { LIMIT, PAGE } from '@/src/constants/common.constant';
import { IPaginationResponseData } from '@/src/types/common.types';
import {
  CreateUserDto,
  UserDetailsParamDto,
} from '@/src/modules/users/dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //----user-list------------------------------------------
  @Get()
  async list(
    @Query('page') page: string = PAGE,
    @Query('limit') limit: string = LIMIT,
  ): Promise<IPaginationResponseData<User>> {
    try {
      return this.usersService.list(Number(page), Number(limit));
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
  //----user-details------------------------------------------
  @Get(':id')
  async details(@Param() params: UserDetailsParamDto): Promise<User> {
    try {
      return this.usersService.details(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      return this.usersService.create(body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
