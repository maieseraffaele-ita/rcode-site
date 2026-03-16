import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Componente Footer
 * Contiene informazioni aziendali, link utili, social e compliance legal
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer-container">
        <!-- Footer Content -->
        <div class="footer-content">
          <!-- Company Info -->
          <div class="footer-section footer-company">
            <div class="footer-brand">
              <img src="https://cdn.builder.io/api/v1/image/assets%2F1943edd12dc64bf8b23552caea052385%2Fdb7c3236ea6249879c288e0f06329919?format=webp&width=800&height=1200" alt="RCODE Logo" class="logo-icon">
              <span class="logo-text">RCODE</span>
            </div>
            <p class="company-description">
              {{ t('footer.company_description') }}
            </p>
            <div class="social-links">
              <a href="https://linkedin.com/in/raffaelemaiese" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="social-link linkedin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://github.com/maieseraffaele-ita" target="_blank" rel="noopener noreferrer" title="GitHub" class="social-link github">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.75 16 2.48a13.38 13.38 0 00-7 0C6.27.75 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V21"/>
                </svg>
              </a>
              <a href="https://instagram.com/raffaelemaiese" target="_blank" rel="noopener noreferrer" title="Instagram" class="social-link instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
              <a href="https://facebook.com/raffaelemaiese" target="_blank" rel="noopener noreferrer" title="Facebook" class="social-link facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Services Links -->
          <div class="footer-section">
            <h4 class="footer-title">{{ t('footer.services') }}</h4>
            <ul class="footer-links">
              <li><a routerLink="/servizi" [fragment]="'digital-transformation'">{{ t('service.digital_transformation') }}</a></li>
              <li><a routerLink="/servizi" [fragment]="'cloud'">{{ t('service.cloud') }}</a></li>
              <li><a routerLink="/servizi" [fragment]="'ai'">{{ t('service.ai') }}</a></li>
              <li><a routerLink="/servizi" [fragment]="'cybersecurity'">{{ t('service.cybersecurity') }}</a></li>
              <li><a routerLink="/servizi" [fragment]="'development'">{{ t('service.development') }}</a></li>
            </ul>
          </div>

          <!-- Company Links -->
          <div class="footer-section">
            <h4 class="footer-title">{{ t('footer.company') }}</h4>
            <ul class="footer-links">
              <li><a routerLink="/chi-siamo">{{ t('nav.about') }}</a></li>
              <li><a routerLink="/industrie">{{ t('nav.industries') }}</a></li>
              <li><a routerLink="/progetti">{{ t('nav.projects') }}</a></li>
              <li><a routerLink="/lavora-con-noi">{{ t('nav.careers') }}</a></li>
              <li><a routerLink="/contatti">{{ t('nav.contact') }}</a></li>
              <li><a href="mailto:info@innovatetech.it">Email</a></li>
            </ul>
          </div>

          <!-- Legal Links -->
          <div class="footer-section">
            <h4 class="footer-title">{{ t('footer.legal') }}</h4>
            <ul class="footer-links">
              <li><a routerLink="/privacy-policy">{{ t('footer.privacy') }}</a></li>
              <li><a routerLink="/cookie-policy">{{ t('footer.cookies') }}</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">GDPR Compliance</a></li>
              <li><a href="#">Cookie Preferences</a></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-copyright">
            <p>&copy; {{ currentYear }} RCODE. {{ t('footer.copyright') }}</p>
          </div>
          <div class="footer-badges">
            <span class="badge">{{ t('footer.gdpr') }}</span>
            <span class="badge">{{ t('footer.iso') }}</span>
            <span class="badge">{{ t('footer.enterprise') }}</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  currentYear = new Date().getFullYear();

  constructor(
    protected translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    this.translationService.onLanguageChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Metodo helper per accedere alle traduzioni nel template
   */
  t(key: string): string {
    return this.translationService.translate(key);
  }
}
