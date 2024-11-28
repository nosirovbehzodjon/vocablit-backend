import { I18nTranslations } from '@/src/generated/i18n.generated';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UserLoginDto {
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  @MinLength(5, {
    message: i18nValidationMessage<I18nTranslations>('common.minValue'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('common.fieldRequired'),
  })
  username: string;

  @IsString()
  @Length(6, 20, {
    message: i18nValidationMessage<I18nTranslations>('user.passwordLength'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>('common.fieldRequired'),
  })
  password: string;
}
