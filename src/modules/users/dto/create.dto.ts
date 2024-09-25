import { IsNotEmpty } from 'class-validator';

export class UserLevelCreateDto {
  @IsNotEmpty()
  level: string;
}
