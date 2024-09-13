import { Module } from '@nestjs/common';
import { UsersService } from '@/src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/src/entities/users.entity';
import { UsersController } from '@/src/modules/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
