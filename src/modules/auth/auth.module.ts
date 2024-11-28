import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '@/src/modules/auth/auth.service';
import { AuthController } from '@/src/modules/auth/auth.controller';
import { User } from '@/src/entities/users.entity';
import { UsersService } from '@/src/modules/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
import { DifficultyLevelService } from '@/src/modules/difficulty/diffuculty.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule to access environment variables
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET_KEY'), // Get the secret from the environment
          // signOptions: { expiresIn: '1h', algorithm: 'HS256' },
        };
      },
    }),
    TypeOrmModule.forFeature([User, DifficultyLevel]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, DifficultyLevelService],
})
export class AuthModule {}
