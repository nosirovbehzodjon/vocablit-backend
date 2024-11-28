import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  example: string;
}

export class UpdateExampleDto extends PartialType(CreateExampleDto) {}
