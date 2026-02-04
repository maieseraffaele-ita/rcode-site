import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Componente Header principale
 * Contiene logo, navigazione principale, CTA e menu mobile
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
            <span class="logo-icon">⚡</span>
            <span class="logo-text">Innova Tech</span>
          </a>
        </div>

        <!-- Navigazione Desktop -->
        <nav class="nav-desktop">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link">
            Home
          </a>
          <a routerLink="/chi-siamo" routerLinkActive="active" class="nav-link">
            Chi Siamo
          </a>
          <a routerLink="/servizi" routerLinkActive="active" class="nav-link">
            Servizi
          </a>
          <a routerLink="/industrie" routerLinkActive="active" class="nav-link">
            Industrie
          </a>
          <a routerLink="/lavora-con-noi" routerLinkActive="active" class="nav-link">
            Carriera
          </a>
          <a routerLink="/contatti" routerLinkActive="active" class="nav-link">
            Contatti
          </a>
        </nav>

        <!-- CTA Button -->
        <div class="header-cta">
          <a routerLink="/contatti" class="btn-primary">
            Richiedi Consulenza
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
          Home
        </a>
        <a routerLink="/chi-siamo" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          Chi Siamo
        </a>
        <a routerLink="/servizi" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          Servizi
        </a>
        <a routerLink="/industrie" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          Industrie
        </a>
        <a routerLink="/lavora-con-noi" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          Carriera
        </a>
        <a routerLink="/contatti" routerLinkActive="active" class="nav-mobile-link" (click)="closeMobileMenu()">
          Contatti
        </a>
        <a routerLink="/contatti" class="btn-primary-mobile" (click)="closeMobileMenu()">
          Richiedi Consulenza
        </a>
      </nav>
    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Segnali per lo stato del menu mobile e scroll
  mobileMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);

  constructor() {
    // Listener per il scroll
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
    }
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
