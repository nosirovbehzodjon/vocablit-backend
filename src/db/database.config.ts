import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from '@/src/entities/users.entity';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
import { Words } from '@/src/entities/words.entity';
import { PartOfSpeech } from '@/src/entities/part-of-speech.entity';
import { Defination } from '@/src/entities/defination.entity';
import { Example } from '@/src/entities/example.entity';

export const TypeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [User, DifficultyLevel, PartOfSpeech, Words, Defination, Example],
  }),
};
