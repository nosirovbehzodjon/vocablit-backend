import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/src/app.module';
import { useContainer } from 'class-validator';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new I18nValidationPipe({
      stopAtFirstError: true,
      transform: true,
      validationError: {
        target: false,
      },

      always: true,
      validateCustomDecorators: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: true,

      errorFormatter: (error) => {
        return error.map((item) => item.property);
      },
    }),
  );

  await app.listen(3000);
}

bootstrap();
