import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LanguageService } from '@/src/middlewere/lang/language.service';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  constructor(private readonly languageService: LanguageService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Check for the language from headers or query params
    const language = req.headers['accept-language'] || 'en';

    // Set the detected language in the language service
    this.languageService.setLanguage(language);

    next();
  }
}
