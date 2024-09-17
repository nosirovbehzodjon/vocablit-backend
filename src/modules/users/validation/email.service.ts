import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '@/src/entities/users.entity'; // adjust based on your project
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async validate(email: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return !user;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  defaultMessage(): string {
    return this.i18n.translate('user.emailTaken');
  }
}
