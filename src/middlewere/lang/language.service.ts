import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class LanguageService {
  private language: string;

  setLanguage(language: string) {
    this.language = language;
  }

  getLanguage(): string {
    return this.language || 'en'; // Default to English if not set
  }
}
