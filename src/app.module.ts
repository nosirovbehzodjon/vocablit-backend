import { Module } from '@nestjs/common';
import { UsersModule } from '@/src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmAsyncConfig } from '@/src/db/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

import path from 'path';

import { DifficultyLevelModule } from '@/src/modules/difficulty/diffuculty.module';
import { WordsModule } from '@/src/modules/words/words.module';
import { PartOfSpeechModule } from '@/src/modules/part-of-speech/part-of-speech.module';
import { DefinationModule } from '@/src/modules/definations/defination.module';
import { ExampleModule } from '@/src/modules/example/example.module';
import { AuthModule } from '@/src/modules/auth/auth.module';
import { HEADER_LANG } from '@/src/constants/common.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeOrmAsyncConfig),
    I18nModule.forRootAsync({
      useFactory: () => {
        return {
          fallbackLanguage: 'en',
          loaderOptions: {
            path: path.join(__dirname, '/i18n/'),
            watch: true,
          },
          typesOutputPath: path.join(
            __dirname,
            '../src/generated/i18n.generated.ts',
          ),
        };
      },
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver([HEADER_LANG]),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
    UsersModule,
    DifficultyLevelModule,
    PartOfSpeechModule,
    WordsModule,
    DefinationModule,
    ExampleModule,
    AuthModule,
  ],
})
export class AppModule {}
