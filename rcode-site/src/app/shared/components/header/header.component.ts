import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService, type Language } from '../../../core/services/translation.service';

/**
 * Componente Header principale
 * Contiene logo, navigazione principale, language selector e tasto join team
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header" [class.scrolled]="isScrolled()">
      <div class="header-container">
        <!-- Logo e Brand -->
        <div class="header-brand">
          <a routerLink="/" class="logo">
            <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Outer circle -->
              <circle cx="20" cy="20" r="18" stroke="#00d4ff" stroke-width="1.5" opacity="0.3"/>

              <!-- Letter R with modern design -->
              <g>
                <!-- Vertical stem of R -->
                <rect x="10" y="8" width="3" height="24" fill="#00d4ff" rx="1.5"/>

                <!-- Top curve of R (upper bowl) -->
                <path d="M 13 8 Q 20 8 20 14 Q 20 18 15 18" fill="none" stroke="#00d4ff" stroke-width="3" stroke-linecap="round"/>

                <!-- Diagonal leg of R -->
                <line x1="16" y1="18" x2="26" y2="32" stroke="#00d4ff" stroke-width="3" stroke-linecap="round"/>
              </g>

              <!-- Accent dot indicating innovation -->
              <circle cx="28" cy="10" r="2" fill="#00d4ff"/>
            </svg>
            <span class="logo-text">RCODE</span>
          </a>
        </div>

        <!-- Navigazione Desktop -->
        <nav class="nav-desktop">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">
            {{ t('nav.home') }}
          </a>
          <a routerLink="/chi-siamo" routerLinkActive="active" class="nav-link">
            {{ t('nav.about') }}
          </a>
          <a routerLink="/servizi" routerLinkActive="active" class="nav-link">
            {{ t('nav.services') }}
          </a>
          <a routerLink="/industrie" routerLinkActive="active" class="nav-link">
            {{ t('nav.industries') }}
          </a>
          <a routerLink="/contatti" routerLinkActive="active" class="nav-link">
            {{ t('nav.contact') }}
          </a>
          <a routerLink="/privacy-policy" routerLinkActive="active" class="nav-link">
            {{ t('nav.request_consultation') }}
          </a>
        </nav>

        <!-- Right Section: Language Selector + CTA Button -->
        <div class="header-right">
          <!-- Language Selector -->
          <div class="language-selector">
            <select [value]="currentLanguage()" (change)="onLanguageChange($event)" class="language-dropdown">
              <option value="it">{{ t('language.italian') }}</option>
              <option value="en">{{ t('language.english') }}</option>
              <option value="de">{{ t('language.german') }}</option>
            </select>
            <span class="language-icon">🌐</span>
          </div>

          <!-- Join Team Button -->
          <a routerLink="/lavora-con-noi" class="btn-primary">
            {{ t('nav.join_team') }}
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="menu-toggle" [class.active]="mobileMenuOpen()" (click)="toggleMobileMenu()" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <nav class="nav-mobile" *ngIf="mobileMenuOpen()">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-mobile-link" (click)="closeMobileMenu()">
          {{ t('nav.home') }}
        </a>
        <a routerLink="/chi-siamo" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          {{ t('nav.about') }}
        </a>
        <a routerLink="/servizi" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          {{ t('nav.services') }}
        </a>
        <a routerLink="/industrie" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          {{ t('nav.industries') }}
        </a>
        <a routerLink="/contatti" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          {{ t('nav.contact') }}
        </a>
        <a routerLink="/privacy-policy" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          {{ t('nav.request_consultation') }}
        </a>
        
        <div class="mobile-bottom-section">
          <div class="mobile-language-selector">
            <label>{{ t('language.english') }}:</label>
            <select [value]="currentLanguage()" (change)="onLanguageChange($event)" class="language-dropdown">
              <option value="it">{{ t('language.italian') }}</option>
              <option value="en">{{ t('language.english') }}</option>
              <option value="de">{{ t('language.german') }}</option>
            </select>
          </div>
          <a routerLink="/lavora-con-noi" class="btn-primary-mobile" (click)="closeMobileMenu()">
            {{ t('nav.join_team') }}
          </a>
        </div>
      </nav>
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Segnali per lo stato del menu mobile e scroll
  mobileMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);
  currentLanguage = signal<Language>('it');

  constructor(private translationService: TranslationService) {
    this.currentLanguage.set(this.translationService.getLanguage());
    
    // Listener per il scroll
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
    }
  }

  /**
   * Traduce una chiave
   */
  t(key: string): string {
    return this.translationService.translate(key);
  }

  /**
   * Cambia la lingua
   */
  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const language = target.value as Language;
    this.translationService.setLanguage(language);
    this.currentLanguage.set(language);
  }

  /**
   * Attiva/disattiva il menu mobile
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(value => !value);
  }

  /**
   * Chiude il menu mobile
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
