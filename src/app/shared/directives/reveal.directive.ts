import {
  Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2, inject
} from '@angular/core';

@Directive({
  selector: '[appRevealDirective]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appReveal') delay = 0;
  @Input() revealThreshold = 0.1;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'opacity', '0');
    this.renderer.setStyle(nativeEl, 'transform', 'translateY(40px)');
    this.renderer.setStyle(nativeEl, 'transition',
      `opacity 0.8s ease ${this.delay}ms, transform 0.8s ease ${this.delay}ms`
    );

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.setStyle(nativeEl, 'opacity', '1');
            this.renderer.setStyle(nativeEl, 'transform', 'translateY(0)');
            this.observer?.unobserve(nativeEl);
          }
        });
      },
      { threshold: this.revealThreshold, rootMargin: '0px 0px -60px 0px' }
    );
    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
