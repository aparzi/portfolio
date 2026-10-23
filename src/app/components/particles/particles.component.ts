import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * A field of slow-drifting dots that connect when close, with a gentle pull
 * toward the pointer. Runs outside Angular's zone so it never triggers change detection.
 */
@Component({
  selector: 'app-particles',
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: `
    :host { position: absolute; inset: 0; display: block; pointer-events: none; }
    canvas { width: 100%; height: 100%; display: block; }
  `,
})
export class ParticlesComponent implements OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly zone = inject(NgZone);

  private dots: Dot[] = [];
  private raf = 0;
  private pointer = { x: -9999, y: -9999 };
  private width = 0;
  private height = 0;
  private dpr = 1;
  private readonly abort = new AbortController();

  constructor() {
    afterNextRender(() => this.start());
  }

  private start(): void {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const host = canvas.parentElement ?? canvas;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = host.clientWidth;
      this.height = host.clientHeight;
      canvas.width = this.width * this.dpr;
      canvas.height = this.height * this.dpr;
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      this.seed();
    };

    const { signal } = this.abort;
    window.addEventListener('resize', resize, { signal });
    window.addEventListener(
      'pointermove',
      (e) => {
        const rect = canvas.getBoundingClientRect();
        this.pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      },
      { signal, passive: true },
    );
    window.addEventListener('pointerleave', () => (this.pointer = { x: -9999, y: -9999 }), { signal });

    resize();

    this.zone.runOutsideAngular(() => {
      const draw = () => {
        ctx.clearRect(0, 0, this.width, this.height);
        const dots = this.dots;
        const linkDist = 130;

        for (const d of dots) {
          if (!reduced) {
            // gentle attraction toward the pointer
            const dx = this.pointer.x - d.x;
            const dy = this.pointer.y - d.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 220 && dist > 0.1) {
              d.vx += (dx / dist) * 0.012;
              d.vy += (dy / dist) * 0.012;
            }
            d.vx *= 0.985;
            d.vy *= 0.985;
            d.x += d.vx;
            d.y += d.vy;
            if (d.x < -20) d.x = this.width + 20;
            if (d.x > this.width + 20) d.x = -20;
            if (d.y < -20) d.y = this.height + 20;
            if (d.y > this.height + 20) d.y = -20;
          }
        }

        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const a = dots[i];
            const b = dots[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = dx * dx + dy * dy;
            if (dist < linkDist * linkDist) {
              const t = 1 - Math.sqrt(dist) / linkDist;
              ctx.strokeStyle = `rgba(139, 108, 255, ${(t * 0.35).toFixed(3)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        for (const d of dots) {
          ctx.fillStyle = 'rgba(255, 92, 138, 0.75)';
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (!reduced) this.raf = requestAnimationFrame(draw);
      };
      draw();
    });
  }

  private seed(): void {
    const count = Math.round((this.width * this.height) / 14000);
    this.dots = Array.from({ length: Math.min(Math.max(count, 30), 110) }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.6,
    }));
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.abort.abort();
  }
}
