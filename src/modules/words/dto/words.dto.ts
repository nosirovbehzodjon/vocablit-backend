import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Validate,
  ValidateNested,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UniqueWordValidator } from '@/src/modules/words/validation/word.service';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';

export class CreateWordDto {
  @IsNotEmpty()
  @Validate(UniqueWordValidator)
  @Matches(/^[A-Z][a-zA-Z\s]*$/, {
    message: i18nValidationMessage<I18nTranslations>('word.allowedWord'),
  })
  word: string;

  @IsOptional()
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  difficulty_level?: string[];

  @IsOptional()
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  part_of_speech?: string[];

  @IsOptional()
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  defination?: string[];

  @IsOptional()
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  example?: string[];
}

export class IKeyValueResponseData {
  @IsString()
  key: string;
  @IsString()
  value: string;
}

export class UpdateWordDto extends PartialType(
  OmitType(CreateWordDto, ['defination']),
) {
  @IsOptional()
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  @ValidateNested({ each: true })
  @Type(() => IKeyValueResponseData)
  defination?: IKeyValueResponseData[];
}

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

export class AddNewExampleDto {
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  example: string[];
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
