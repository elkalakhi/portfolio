import { Component, ChangeDetectionStrategy, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PortfolioData } from '../../../../core/services/portfolio-data';
import { Scroll } from '../../../../core/services/scroll';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [class.scrolled]="scrollService.isScrolled()">
      <div class="nav-logo" (click)="scrollService.scrollToTop()">
        <div class="logo-icon">
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="1"
              y="1"
              width="34"
              height="34"
              rx="8"
              stroke="#3b82f6"
              stroke-width="1.5"
              fill="none"
            />
            <rect
              x="5"
              y="5"
              width="26"
              height="26"
              rx="5"
              stroke="#38bdf8"
              stroke-width="0.8"
              fill="rgba(56,189,248,0.05)"
            />
            <line
              x1="18"
              y1="5"
              x2="18"
              y2="31"
              stroke="#38bdf8"
              stroke-width="0.5"
              stroke-dasharray="2 3"
              opacity="0.4"
            />
            <line
              x1="5"
              y1="18"
              x2="31"
              y2="18"
              stroke="#38bdf8"
              stroke-width="0.5"
              stroke-dasharray="2 3"
              opacity="0.4"
            />
            <circle
              cx="18"
              cy="18"
              r="5"
              stroke="#3b82f6"
              stroke-width="1.5"
              fill="rgba(59,130,246,0.15)"
            />
            <circle cx="18" cy="18" r="2" fill="#38bdf8" />
            <circle cx="9" cy="9" r="1.5" fill="#3b82f6" opacity="0.8" />
            <circle cx="27" cy="9" r="1.5" fill="#3b82f6" opacity="0.8" />
            <circle cx="9" cy="27" r="1.5" fill="#3b82f6" opacity="0.8" />
            <circle cx="27" cy="27" r="1.5" fill="#3b82f6" opacity="0.8" />
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-p6">P6</span><span class="logo-io">IO</span
          ><span class="logo-dot">.</span><span class="logo-name">ELKALAKHI</span>
        </div>
      </div>

      <ul class="nav-links">
        @for (link of dataService.navLinks(); track link.fragment) {
          <li>
            <a (click)="scrollService.scrollToSection(link.fragment)">
              {{ link.label | translate }}
            </a>
          </li>
        }
      </ul>

      <div class="nav-actions">
        <button type="button" class="theme-toggle" (click)="toggleTheme()">
          <i class="fa-solid" [ngClass]="themeLabel ? 'fa-moon' : 'fa-sun'"> </i>
        </button>

        <button type="button" class="lang-btn" (click)="lang.toggle()">
          <i
            class="fa-solid fa-language"
            [style.color]="lang.currentLang() === 'fr' ? '#0055A4' : '#C8102E'"
          >
          </i>
          {{ lang.currentLang() === 'fr' ? 'FR' : 'EN' }}
        </button>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.scss'],
})
export class Navbar implements OnInit, OnDestroy {
  readonly dataService = inject(PortfolioData);
  readonly scrollService = inject(Scroll);
  readonly document = inject(DOCUMENT);
  lang = inject(LanguageService);
  theme: 'dark' | 'light' = 'dark';

  get themeLabel(): boolean {
    return this.theme === 'light';
  }

  ngOnInit(): void {
    this.scrollService.init();
    if (typeof window !== 'undefined') {
      this.theme = (localStorage.getItem('portfolio-theme') as 'dark' | 'light') ?? 'dark';
      this.updateThemeClass();
    }
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.updateThemeClass();
  }

  private updateThemeClass(): void {
    const root = this.document.documentElement;
    root.classList.toggle('light-theme', this.theme === 'light');
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', this.theme);
    }
  }
}
