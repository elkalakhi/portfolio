import {
  Directive, ElementRef, Input, OnInit, OnDestroy, inject
} from '@angular/core';

@Directive({
  selector: '[appCounterDirective]',
   standalone: true,
})
export class CounterDirective implements OnInit, OnDestroy {
  @Input('appCounter') target = 0;
  @Input() counterSuffix = '';
  @Input() counterDuration = 1500;

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;
  private animId: number | null = null;

  ngOnInit(): void {
    this.el.nativeElement.textContent = '0' + this.counterSuffix;

    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.animate();
        this.observer?.unobserve(this.el.nativeElement);
      }
    }, { threshold: 0.5 });

    this.observer.observe(this.el.nativeElement);
  }

  private animate(): void {
    const start = performance.now();
    const target = this.target;
    const duration = this.counterDuration;
    const suffix = this.counterSuffix;
    const el = this.el.nativeElement;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) {
        this.animId = requestAnimationFrame(step);
      }
    };
    this.animId = requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.animId !== null) cancelAnimationFrame(this.animId);
  }
}
