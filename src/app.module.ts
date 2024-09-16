import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from '@/src/modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmAsyncConfig } from '@/src/db/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageService } from '@/src/middlewere/lang/language.service';
import { LanguageMiddleware } from '@/src/middlewere/lang/language.middlewere';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(TypeOrmAsyncConfig),
    UsersModule,
  ],
  providers: [LanguageService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes('*'); // Apply to all routes
  }
}
