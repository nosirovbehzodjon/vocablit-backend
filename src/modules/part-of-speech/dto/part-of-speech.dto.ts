import { IsIn, Validate } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { PartialType } from '@nestjs/mapped-types';
import { UniqueLevelValidator } from '@/src/modules/difficulty/validation/level.service';

const speeches: string[] = [
  'Noun',
  'Pronoun',
  'Verb',
  'Adjective',
  'Adverb',
  'Preposition',
  'Conjunction',
  'Interjection',
] as const;

export class CreatePartOfSpeechDto {
  @Validate(UniqueLevelValidator)
  @IsIn(speeches, {
    message: i18nValidationMessage<I18nTranslations>('common.partOfSpeech'),
  })
  speech: string;
}

export class UpdatePartOfSpeechDto extends PartialType(CreatePartOfSpeechDto) {}
