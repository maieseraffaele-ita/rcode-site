import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../core/services/cookie-consent.service';

/**
 * Componente Cookie Banner
 * Implementa il banner cookie GDPR-compliant
 * Permette all'utente di accettare/rifiutare cookie
 */
@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cookie-banner" [@slideIn]>
      <div class="cookie-container">
        <!-- Cookie Message -->
        <div class="cookie-content">
          <div class="cookie-icon">🍪</div>
          <div class="cookie-text">
            <h3 class="cookie-title">Preferenze Cookie</h3>
            <p class="cookie-description">
              Utilizziamo cookie per migliorare la tua esperienza di navigazione, 
              personalizzare i contenuti e analizzare il traffico del sito. 
              <a routerLink="/cookie-policy" class="link">Scopri di più</a> su come utilizziamo i cookie.
            </p>

            <!-- Cookie Details (Collapsible) -->
            <div class="cookie-details" *ngIf="showDetails()">
              <div class="cookie-group">
                <label class="cookie-checkbox">
                  <input type="checkbox" [checked]="true" disabled class="checkbox">
                  <span class="checkbox-label">
                    <strong>Cookie Tecnici (Necessari)</strong>
                    <small>Sempre abilitati per il funzionamento del sito</small>
                  </span>
                </label>
              </div>

              <div class="cookie-group">
                <label class="cookie-checkbox">
                  <input type="checkbox" [checked]="cookieService.analyticsConsent()" 
                         (change)="toggleAnalytics($event)">
                  <span class="checkbox-label">
                    <strong>Cookie Analytics</strong>
                    <small>Ci aiutano a capire come utilizzi il sito</small>
                  </span>
                </label>
              </div>

              <div class="cookie-group">
                <label class="cookie-checkbox">
                  <input type="checkbox" [checked]="cookieService.marketingConsent()" 
                         (change)="toggleMarketing($event)">
                  <span class="checkbox-label">
                    <strong>Cookie Marketing</strong>
                    <small>Utilizzati per mostrarti annunci personalizzati</small>
                  </span>
                </label>
              </div>
            </div>

            <!-- Toggle Details Button -->
            <button class="toggle-details-btn" (click)="toggleDetailsView()">
              {{ showDetails() ? 'Nascondi dettagli' : 'Mostra dettagli' }}
            </button>
          </div>
        </div>

        <!-- Cookie Actions -->
        <div class="cookie-actions">
          <button class="btn-secondary" (click)="rejectCookies()">
            Rifiuta Tutto
          </button>
          <button class="btn-primary" (click)="acceptCookies()">
            Accetta Tutto
          </button>
        </div>
      </div>

      <!-- Legal Reference -->
      <p class="gdpr-reference">
        Conformità a <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank">Regolamento UE 2016/679 (GDPR)</a> 
        | <a routerLink="/privacy-policy">Privacy Policy</a>
      </p>
    </div>
  `,
  styleUrl: './cookie-banner.component.scss'
})
export class CookieBannerComponent {
  showDetails = signal<boolean>(false);
  analyticsChecked = signal<boolean>(false);
  marketingChecked = signal<boolean>(false);

  constructor(public cookieService: CookieConsentService) {}

  /**
   * Accetta tutti i cookie
   */
  acceptCookies(): void {
    this.cookieService.acceptConsent(true, true);
  }

  /**
   * Rifiuta tutti i cookie non essenziali
   */
  rejectCookies(): void {
    this.cookieService.rejectConsent();
  }

  /**
   * Attiva/disattiva la visualizzazione dei dettagli
   */
  toggleDetailsView(): void {
    this.showDetails.update(value => !value);
  }

  /**
   * Gestisce il cambiamento dello stato analytics
   */
  toggleAnalytics(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.analyticsChecked.set(target.checked);
  }

  /**
   * Gestisce il cambiamento dello stato marketing
   */
  toggleMarketing(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.marketingChecked.set(target.checked);
  }
}
