import { DOCUMENT, Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Scroll {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly isScrolled = signal(false);
  readonly activeSection = signal<string>('hero');

  private scrollListener: (() => void) | null = null;

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const handler = () => {
      this.isScrolled.set(window.scrollY > 60);
    };
    window.addEventListener('scroll', handler, { passive: true });
    this.scrollListener = handler;
  }

  destroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  scrollToSection(fragment: string): void {
    const el = this.document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
