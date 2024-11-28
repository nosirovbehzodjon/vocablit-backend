import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '@/src/modules/auth/auth.service';
import { JwtAuthGuard } from '@/src/guard/jwt-auth.guard';
import { UsersService } from '@/src/modules/users/users.service';
import { CreateUserDto } from '@/src/modules/users/dto/users.dto';
import { UserLoginDto } from '@/src/modules/auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    try {
      return this.usersService.create(body);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() body: UserLoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProtectedResource() {
    return { message: 'This is a protected route' };
  }
}
