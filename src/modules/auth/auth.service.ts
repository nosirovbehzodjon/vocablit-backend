import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/src/entities/users.entity';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { ILoginResponseData, JwtPayload } from '@/src/types/common.types';
import { UserLoginDto } from '@/src/modules/auth/dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private i18n: I18nService<I18nTranslations>,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Valid user
    }
    throw new UnauthorizedException(
      this.i18n.translate('common.invalidCredentials'),
    );
  }

  // Generate JWT
  async login(data: UserLoginDto): Promise<ILoginResponseData> {
    const { password, username } = data;
    const user = await this.validateUser(username, password);
    const payload: JwtPayload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload);
    return {
      statusCode: HttpStatus.OK,
      message: this.i18n.translate('common.successLogin'),
      data: {
        token: accessToken,
      },
    };
  }

  verify(payload: string): JwtPayload {
    try {
      const config = new ConfigService();

      return this.jwtService.verify(payload, {
        secret: config.get('SECRET_KEY'),
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
