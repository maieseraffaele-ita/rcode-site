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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.818 0-9.753h3.554v1.381c.43-.662 1.191-1.602 2.901-1.602 2.121 0 3.712 1.388 3.712 4.369v5.605zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.771-1.715 1.921-1.715 1.147 0 1.918.76 1.94 1.715 0 .953-.791 1.715-1.946 1.715zm-1.6 11.597h3.189V9.694H3.737v10.758zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com/raffaele" target="_blank" rel="noopener noreferrer" title="X (Twitter)" class="social-link twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.802-5.997 6.802H2.16l7.73-8.835L1.126 2.25h6.84l4.713 6.231 5.449-6.231zM17.002 18.807h1.844L6.962 3.923H5.033l11.969 14.884z"/>
                </svg>
              </a>
              <a href="https://github.com/maieseraffaele-ita" target="_blank" rel="noopener noreferrer" title="GitHub" class="social-link github">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
