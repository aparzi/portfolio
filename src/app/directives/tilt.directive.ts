import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Subtle 3D tilt that follows the pointer, plus a spotlight position
 * exposed as --mx / --my for the card's CSS to use.
 */
@Directive({
  selector: '[appTilt]',
  host: {
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'reset()',
    '(pointerdown)': 'reset()',
  },
})
export class TiltDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly reduced =
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  onMove(event: PointerEvent): void {
    if (this.reduced || event.pointerType === 'touch') return;
    const node = this.el.nativeElement;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * 8;
    const ry = (px - 0.5) * 10;
    node.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    node.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    node.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
  }

  reset(): void {
    this.el.nativeElement.style.transform = '';
  }
}
