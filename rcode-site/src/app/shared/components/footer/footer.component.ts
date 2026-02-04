import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';

/**
 * Componente Footer
 * Contiene informazioni aziendali, link utili, social e compliance legal
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <!-- Footer Content -->
        <div class="footer-content">
          <!-- Company Info -->
          <div class="footer-section footer-company">
            <div class="footer-brand">
              <span class="logo-icon">⚡</span>
              <span class="logo-text">RCODE</span>
            </div>
            <p class="company-description">
              {{ t('footer.company_description') }}
            </p>
            <div class="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener" title="LinkedIn" class="social-link">in</a>
              <a href="https://twitter.com" target="_blank" rel="noopener" title="Twitter" class="social-link">𝕏</a>
              <a href="https://github.com" target="_blank" rel="noopener" title="GitHub" class="social-link">gh</a>
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
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(protected translationService: TranslationService) {}

  /**
   * Metodo helper per accedere alle traduzioni nel template
   */
  t(key: string): string {
    return this.translationService.translate(key);
  }
}
