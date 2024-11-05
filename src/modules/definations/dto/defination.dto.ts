import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDefinationDto {
  @IsString()
  @IsNotEmpty()
  defination: string;
}

export class UpdateDefinationDto extends PartialType(CreateDefinationDto) {}
