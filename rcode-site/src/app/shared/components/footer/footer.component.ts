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
              <span class="logo-text">Innova Tech Solutions</span>
            </div>
            <p class="company-description">
              Partner strategico per la trasformazione digitale delle tue aziende.
              Innovazione, affidabilità e risultati misurabili.
            </p>
            <div class="social-links">
              <a href="https://linkedin.com" target="_blank" rel="noopener" title="LinkedIn" class="social-link">in</a>
              <a href="https://twitter.com" target="_blank" rel="noopener" title="Twitter" class="social-link">𝕏</a>
              <a href="https://github.com" target="_blank" rel="noopener" title="GitHub" class="social-link">gh</a>
            </div>
          </div>

          <!-- Services Links -->
          <div class="footer-section">
            <h4 class="footer-title">Servizi</h4>
            <ul class="footer-links">
              <li><a routerLink="/servizi" [fragment]="'digital-transformation'">Trasformazione Digitale</a></li>
              <li><a routerLink="/servizi" [fragment]="'cloud'">Cloud & Infrastructure</a></li>
              <li><a routerLink="/servizi" [fragment]="'ai'">Artificial Intelligence</a></li>
              <li><a routerLink="/servizi" [fragment]="'cybersecurity'">Cybersecurity</a></li>
              <li><a routerLink="/servizi" [fragment]="'development'">Application Development</a></li>
            </ul>
          </div>

          <!-- Company Links -->
          <div class="footer-section">
            <h4 class="footer-title">Azienda</h4>
            <ul class="footer-links">
              <li><a routerLink="/chi-siamo">Chi Siamo</a></li>
              <li><a routerLink="/industrie">Industrie</a></li>
              <li><a routerLink="/lavora-con-noi">Lavora Con Noi</a></li>
              <li><a routerLink="/contatti">Contatti</a></li>
              <li><a href="mailto:info@innovatetech.it">Email</a></li>
            </ul>
          </div>

          <!-- Legal Links -->
          <div class="footer-section">
            <h4 class="footer-title">Legal</h4>
            <ul class="footer-links">
              <li><a routerLink="/privacy-policy">Privacy Policy</a></li>
              <li><a routerLink="/cookie-policy">Cookie Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">GDPR Compliance</a></li>
              <li><a href="#">Cookie Preferences</a></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-copyright">
            <p>&copy; {{ currentYear }} Innova Tech Solutions. Tutti i diritti riservati.</p>
          </div>
          <div class="footer-badges">
            <span class="badge">GDPR Compliant</span>
            <span class="badge">ISO 27001</span>
            <span class="badge">Enterprise Ready</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
