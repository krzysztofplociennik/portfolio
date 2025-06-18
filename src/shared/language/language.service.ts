import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = signal('en');
  private translations = signal<any>({});
  private fallbackLang = 'en';

  async loadLanguage(lang: string): Promise<void> {
    try {
      const response = await fetch(`assets/i18n/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);

      const data = await response.json();
      this.translations.set(data);
      this.currentLang.set(lang);

      localStorage.setItem('selectedLanguage', lang);

    } catch (error) {
      console.error('Failed to load language:', error);
      if (lang !== this.fallbackLang) {
        await this.loadLanguage(this.fallbackLang);
      }
    }
  }

  translate(key: string): string {
    const translations = this.translations();
    const result = this.getNestedProperty(translations, key);

    return result || `[Missing: ${key}]`;
  }

  getCurrentLanguage(): string {
    return this.currentLang();
  }

  getAvailableLanguages(): string[] {
    return ['en', 'pl'];
  }

  async changeLanguage(lang: string): Promise<void> {
    if (lang !== this.currentLang()) {
      await this.loadLanguage(lang);
    }
  }

  async initialize(): Promise<void> {
    const storedLang = localStorage.getItem('selectedLanguage') || this.fallbackLang;
    await this.loadLanguage(storedLang);
  }

  private getNestedProperty(obj: any, key: string): string {
    const parts = key.split('.');

    let current = obj;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        return 'undefined';
      }
    }
    return current;
  }
}
