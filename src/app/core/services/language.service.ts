import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  private translate = inject(TranslateService);

  currentLang = signal<'fr' | 'en'>('fr');

  constructor() {
    let saved: 'fr' | 'en' = 'fr';

    // localStorage uniquement dans le browser
    if (isPlatformBrowser(this.platformId)) {
      saved = (localStorage.getItem('lang') as 'fr' | 'en') || 'fr';
    }

    this.currentLang.set(saved);
    this.translate.use(saved);
  }

  toggle(): void {
    const next = this.currentLang() === 'fr' ? 'en' : 'fr';
    this.currentLang.set(next);
    this.translate.use(next);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', next);
    }
  }
}
