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

export class UserDetailsParamDto {
  @IsUUID()
  id: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @Validate(UniqueUsernameValidator)
  @MinLength(5)
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(1)
  first_name: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'native'], {
    message: 'Learning level must be one of A1, A2, B1, B2, C1, C2, or native',
  })
  learning_level: string;

  @IsNumber({}, { message: 'XP must be a number' })
  @IsOptional() // XP is optional with a default of 0
  xp?: number;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEmail()
  @IsOptional()
  @IsString()
  @Validate(UniqueEmailValidator)
  email?: string;

  @IsString()
  @IsOptional()
  birthday?: string;

  @IsIn(['male', 'female'], {
    message: 'Gender must be either male or female',
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
    message: 'Role must be one of student, admin, or super_admin',
  })
  @IsOptional()
  role?: string;
}
