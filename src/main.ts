import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/src/app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { LanguageMiddleware } from '@/src/middlewere/lang/language.middlewere';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );

  //---lang-middlewere----------
  app.use(LanguageMiddleware);
  await app.listen(3000);
}
bootstrap();
