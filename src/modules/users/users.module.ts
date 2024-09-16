import { Module } from '@nestjs/common';
import { UsersService } from '@/src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/src/entities/users.entity';
import { UsersController } from '@/src/modules/users/users.controller';
import { UniqueUsernameValidator } from '@/src/modules/users/validation/username.service';
import { UniqueEmailValidator } from '@/src/modules/users/validation/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UniqueUsernameValidator, UniqueEmailValidator],
})
export class UsersModule {}
