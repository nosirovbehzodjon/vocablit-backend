import { Module } from '@nestjs/common';
import { UsersService } from '@/src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '@/src/modules/users/users.controller';
import { UniqueUsernameValidator } from '@/src/modules/users/validation/username.service';
import { UniqueEmailValidator } from '@/src/modules/users/validation/email.service';
import { User } from '@/src/entities/users.entity';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
import { DifficultyLevelService } from '../difficulty/diffuculty.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, DifficultyLevel])],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtService,
    AuthService,
    DifficultyLevelService,
    UniqueUsernameValidator,
    UniqueEmailValidator,
  ],
})
export class UsersModule {}
