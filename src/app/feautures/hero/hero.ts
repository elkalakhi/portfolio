import {
  Component,
  ChangeDetectionStrategy,
  inject,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { PortfolioData } from '../../core/services/portfolio-data';
import { Scroll } from '../../core/services/scroll';
import { Canvas } from '../../core/services/canvas';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class Hero implements AfterViewInit, OnDestroy {
  readonly data = inject(PortfolioData);
  readonly scroll = inject(Scroll);
  lang = inject(LanguageService);
  private readonly canvas = inject(Canvas);
  private readonly platformId = inject(PLATFORM_ID);

  getBarClass(level: number): string {
    if (level < 40) return 'bar-low';

    if (level < 70) return 'bar-medium';

    if (level < 90) return 'bar-good';

    return 'bar-expert';
  }

  @ViewChild('bgCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('holoCard') holoCardRef!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.canvas.init(this.canvasRef.nativeElement);
    this.initHoloTilt();
    this.animateHoloBars();
  }

  ngOnDestroy(): void {
    this.canvas.destroy();
  }

  private initHoloTilt(): void {
    const heroEl = document.getElementById('hero');
    const card = this.holoCardRef?.nativeElement;
    if (!heroEl || !card) return;

    heroEl.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      card.style.transform = `rotateY(${dx * 18}deg) rotateX(${-dy * 18}deg) scale(1.02)`;
    });

    heroEl.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
  }

  private animateHoloBars(): void {
    setTimeout(() => {
      const fills = document.querySelectorAll<HTMLElement>('.holo-bar-fill');
      fills.forEach((el, i) => {
        setTimeout(() => {
          el.style.width = el.dataset['w'] ?? '80%';
        }, i * 150);
      });
    }, 1500);
  }
}
