import { Component, HostListener, computed, effect, signal } from '@angular/core';
import { CountUpComponent } from './components/count-up/count-up.component';
import { ParticlesComponent } from './components/particles/particles.component';
import { RevealDirective } from './directives/reveal.directive';
import { TiltDirective } from './directives/tilt.directive';
import { Lang, content, profile } from './data/profile';

const LANG_KEY = 'portfolio-lang';

@Component({
  selector: 'app-root',
  imports: [CountUpComponent, ParticlesComponent, RevealDirective, TiltDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly profile = profile;
  readonly year = new Date().getFullYear();

  /** English by default; a stored choice wins. */
  readonly lang = signal<Lang>(App.storedLang() ?? 'en');
  readonly c = computed(() => content[this.lang()]);
  readonly ui = computed(() => this.c().ui);

  readonly sections = computed(() => [
    { id: 'about', label: this.ui()['about'] },
    { id: 'open-source', label: this.ui()['openSource'] },
    { id: 'experience', label: this.ui()['experience'] },
    { id: 'skills', label: this.ui()['skills'] },
    { id: 'education', label: this.ui()['education'] },
  ]);

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly glow = signal({ x: -1000, y: -1000 });

  readonly glowStyle = computed(() => `transform: translate(${this.glow().x}px, ${this.glow().y}px)`);
  readonly skillTicker = computed(() => {
    const s = this.c().skills;
    return [...s.core, ...s.also, ...s.core, ...s.also];
  });

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch {
        /* storage unavailable: language just won't persist */
      }
    });
  }

  private static storedLang(): Lang | null {
    try {
      const v = localStorage.getItem(LANG_KEY);
      return v === 'it' || v === 'en' ? v : null;
    } catch {
      return null;
    }
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  @HostListener('window:pointermove', ['$event'])
  onPointer(e: PointerEvent): void {
    if (e.pointerType === 'touch') return;
    this.glow.set({ x: e.clientX, y: e.clientY });
  }

  @HostListener('window:keydown.escape')
  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }
}
