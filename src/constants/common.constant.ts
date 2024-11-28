import { IsArray, IsString, IsUUID } from 'class-validator';
import { I18nTranslations } from '../generated/i18n.generated';
import { i18nValidationMessage } from 'nestjs-i18n';

export const PAGE = '1' as const;
export const LIMIT = '10' as const;

export class IdentifyParamDto {
  @IsUUID()
  id: string;
}

export class IdentifiesParamDto {
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>('common.arrayRequired'),
  })
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  @IsUUID('4', {
    each: true,
    message: i18nValidationMessage<I18nTranslations>('common.uuidInvalid'),
  })
  id: string[];
}

// HEADER CONSTANTS
export const HEADER_LANG = 'x-lang' as const;
export const HEADER_AUTHORIZATION = 'authorization' as const;
export const TOKEN_TYPE = 'Bearer ' as const;
