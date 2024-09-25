import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from '@/src/entities/users.entity';
import { DifficultyLevel } from '@/src/entities/difficulty-level.entity';
import { Words } from '@/src/entities/words.entity';
// import { Words } from '@/src/entities/words.entity';
// import { Defination } from '@/src/entities/defination.entity';
// import { Examples } from '@/src/entities/example.entity';
// import { PartOfSpeech } from '@/src/entities/part-of-speach.entity';

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
    entities: [
      User,
      DifficultyLevel,
      Words,
      // Defination,
      // Examples,
      // PartOfSpeech,
    ],
    synchronize: true,
  }),
};
