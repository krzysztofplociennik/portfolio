import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from './language.service';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  
  constructor(private languageService: LanguageService) {}
  
  transform(key: string, params?: any): string {
    const translation = this.languageService.translate(key);
    
    if (params && typeof translation === 'string') {
      return this.interpolateParams(translation, params);
    }
    
    return translation;
  }
  
  private interpolateParams(text: string, params: any): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] || match;
    });
  }
}