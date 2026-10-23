import { Component, ElementRef, OnDestroy, afterNextRender, inject, input, signal } from '@angular/core';

/** Counts from 0 to `value` the first time it scrolls into view. */
@Component({
  selector: 'app-count-up',
  template: `{{ display() }}{{ suffix() }}`,
  styles: `:host { font-variant-numeric: tabular-nums; }`,
})
export class CountUpComponent implements OnDestroy {
  readonly value = input.required<number>();
  readonly suffix = input<string>('');
  readonly display = signal('0');

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private raf = 0;

  constructor() {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.display.set(this.format(this.value()));
        return;
      }
      this.observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.animate();
          this.observer?.disconnect();
        }
      }, { threshold: 0.5 });
      this.observer.observe(this.el.nativeElement);
    });
  }

  private animate(): void {
    const target = this.value();
    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      this.display.set(this.format(Math.round(target * eased)));
      if (t < 1) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  private format(n: number): string {
    return n >= 1000 ? `${Math.round(n / 1000)}k` : String(n);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.raf);
  }
}
