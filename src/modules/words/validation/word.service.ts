// unique-level.validator.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  //   ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { Words } from '@/src/entities/words.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueWordValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Words)
    private wordRepository: Repository<Words>,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async validate(word: string): Promise<boolean> {
    try {
      const available = await this.wordRepository.findOne({
        where: { word },
      });
      return !available;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
    // Return true if the level doesn't exist
  }

  defaultMessage(): string {
    return this.i18n.translate('word.wordTaken');
  }
}