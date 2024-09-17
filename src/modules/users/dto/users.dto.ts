import {
  IsUUID,
  IsEmail,
  IsIn,
  IsNumber,
  IsString,
  Length,
  IsOptional,
  IsNotEmpty,
  IsAlpha,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueUsernameValidator } from '@/src/modules/users/validation/username.service';
import { UniqueEmailValidator } from '@/src/modules/users/validation/email.service';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { PartialType } from '@nestjs/mapped-types';

export class UserDetailsParamDto {
  @IsUUID()
  id: string;
}

export class UserDeleteParamDto {
  @IsUUID()
  id: string;
}

export class UserUpdateParamDto {
  @IsUUID()
  id: string;
}

export class CreateUserDto {
  @IsString({
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  @IsNotEmpty()
  @Validate(UniqueUsernameValidator)
  @MinLength(5, {
    message: i18nValidationMessage<I18nTranslations>('common.minValue'),
  })
  username: string;

  @IsString({
    message: i18nValidationMessage<I18nTranslations>('common.stringRequired'),
  })
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(2, {
    message: i18nValidationMessage<I18nTranslations>('common.minValue'),
  })
  first_name: string;

  @IsString()
  @Length(6, 20, {
    message: i18nValidationMessage<I18nTranslations>('user.passwordLength'),
  })
  password: string;

  @IsIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'native'], {
    message: i18nValidationMessage<I18nTranslations>('user.learningLevel'),
  })
  learning_level: string;

  @IsNumber(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>('user.xpNumberRequired'),
    },
  )
  @IsOptional()
  xp?: number;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEmail(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>('user.emailInvalid'),
    },
  )
  @IsOptional()
  @IsString()
  @Validate(UniqueEmailValidator)
  email?: string;

  @IsString()
  @IsOptional()
  birthday?: string;

  @IsIn(['male', 'female'], {
    message: i18nValidationMessage<I18nTranslations>('user.gender'),
  })
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  native_language?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsIn(['student', 'admin', 'super_admin'], {
    message: i18nValidationMessage<I18nTranslations>('user.role'),
  })
  @IsOptional()
  role?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
