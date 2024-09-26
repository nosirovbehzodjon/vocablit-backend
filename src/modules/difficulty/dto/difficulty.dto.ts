import { IsIn, Validate } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from '@/src/generated/i18n.generated';
import { PartialType } from '@nestjs/mapped-types';
import { UniqueLevelValidator } from '@/src/modules/difficulty/validation/level.service';

export class CreateDifficultyLevelDto {
  @Validate(UniqueLevelValidator)
  @IsIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'native'], {
    message: i18nValidationMessage<I18nTranslations>('common.learningLevel'),
  })
  level: string;
}

export class UpdateDifficultyLevelDto extends PartialType(
  CreateDifficultyLevelDto,
) {}
