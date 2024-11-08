import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UniqueWordValidator } from '@/src/modules/words/validation/word.service';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateWordDto {
  @IsNotEmpty()
  @Validate(UniqueWordValidator)
  @Matches(/^[A-Z][a-zA-Z\s]*$/, {
    message: i18nValidationMessage<I18nTranslations>('word.allowedWord'),
  })
  word: string;

  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  difficulty_level: string[];

  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  part_of_speech: string[];

  @IsOptional()
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  defination?: string[];
}

export class UpdateWordDto extends PartialType(CreateWordDto) {}

export class AddNewDefinationDto {
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  defination: string[];
}

export class AddNewPartOfSpeechDto {
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  speech: string[];
}
