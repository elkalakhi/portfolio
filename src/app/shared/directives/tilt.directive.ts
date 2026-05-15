import {
  Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2, inject
} from '@angular/core';

@Directive({
  selector: '[appTiltDirective]',
   standalone: true,
})
export class TiltDirective implements OnDestroy {
  @Input() tiltMax = 12;
  @Input() tiltScale = 1.03;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `translateY(-8px) rotateX(${-y * this.tiltMax}deg) rotateY(${x * this.tiltMax}deg) scale(${this.tiltScale})`
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', '');
  }

  ngOnDestroy(): void { /* cleanup if needed */ }
}

