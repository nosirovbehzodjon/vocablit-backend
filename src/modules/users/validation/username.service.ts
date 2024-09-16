// unique-username.validator.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  //   ValidationArguments,
} from 'class-validator';
import { Repository } from 'typeorm';
import { User } from '@/src/entities/users.entity'; // adjust based on your project

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validate(username: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      return !user;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
    // Return true if the username doesn't exist
  }

  defaultMessage(): string {
    return 'Username $value is already taken';
  }
}
