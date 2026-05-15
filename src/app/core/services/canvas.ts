import { Injectable, NgZone } from '@angular/core';
import { inject } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}


@Injectable({
  providedIn: 'root',
})
export class Canvas {
  private readonly ngZone = inject(NgZone);

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animId: number | null = null;
  private readonly NUM_PARTICLES = 80;
  private readonly CONNECTION_DIST = 140;

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) {
      return;
    }

    this.resize();
    this.initParticles();

    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Run animation outside Angular zone to avoid unnecessary CD cycles
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  destroy(): void {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
    }
  }

  private resize(): void {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initParticles(): void {
    if (!this.canvas) return;
    this.particles = Array.from({ length: this.NUM_PARTICLES }, () => ({
      x: Math.random() * this.canvas!.width,
      y: Math.random() * this.canvas!.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      color: Math.random() < 0.5 ? '0,212,255' : '139,92,246',
    }));
  }

  private animate(): void {
    if (!this.canvas || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Move particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > this.canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
    }

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < this.CONNECTION_DIST) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - d / this.CONNECTION_DIST)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color},0.7)`;
      this.ctx.shadowColor = `rgba(${p.color},0.8)`;
      this.ctx.shadowBlur = 6;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }
}
