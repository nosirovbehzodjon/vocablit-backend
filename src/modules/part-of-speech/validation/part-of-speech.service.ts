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
import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueLevelValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(PartOfSpeech)
    private partOfSpeechRepository: Repository<PartOfSpeech>,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async validate(speech: string): Promise<boolean> {
    try {
      const available = await this.partOfSpeechRepository.findOne({
        where: { speech },
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
    return this.i18n.translate('part-of-speech.speechTaken');
  }
}
