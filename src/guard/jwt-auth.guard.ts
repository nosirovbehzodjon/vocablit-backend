import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  HEADER_AUTHORIZATION,
  TOKEN_TYPE,
} from '@/src/constants/common.constant';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { I18nService } from 'nestjs-i18n';
import { AuthService } from '@/src/modules/auth/auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly i18n: I18nService<I18nTranslations>,
    private authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(this.i18n.t('common.invalidTokenFormat'));
    }

    try {
      const user = this.authService.verify(token);
      console.log('user', user);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token: string | undefined = request.headers[HEADER_AUTHORIZATION];

    if (!token || !token.startsWith(TOKEN_TYPE)) {
      throw new UnauthorizedException(this.i18n.t('common.invalidTokenFormat'));
    }

    return token.split(' ')[1];
  }
}
