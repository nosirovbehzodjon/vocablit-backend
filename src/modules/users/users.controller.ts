import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '@/src/modules/users/users.service';
import { User } from '@/src/entities/users.entity';
import { LIMIT, PAGE } from '@/src/constants/common.constant';
import {
  IDeleteResponseData,
  IPaginationResponseData,
} from '@/src/types/common.types';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDeleteParamDto,
  UserDetailsParamDto,
  UserUpdateParamDto,
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

  //----user-create------------------------------------------
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

  //----user-update------------------------------------------
  @Patch()
  async update(
    @Param() params: UserUpdateParamDto,
    @Body() body: UpdateUserDto,
  ) {
    try {
      return this.usersService.update(params.id, body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  //----user-delete------------------------------------------
  @Delete(':id')
  async delete(
    @Param() params: UserDeleteParamDto,
  ): Promise<IDeleteResponseData> {
    try {
      return this.usersService.delete(params.id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
