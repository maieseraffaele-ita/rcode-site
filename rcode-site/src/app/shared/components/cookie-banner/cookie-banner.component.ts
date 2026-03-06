import { Component, signal, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CookieConsentService } from '../../../core/services/cookie-consent.service';
import { TranslationService } from '../../../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Componente Cookie Banner
 * Implementa il banner cookie GDPR-compliant con traduzioni
 * Permette all'utente di accettare/rifiutare cookie
 */
@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cookie-banner" [@slideIn]>
      <div class="cookie-container">
        <!-- Cookie Message -->
        <div class="cookie-content">
          <div class="cookie-icon">🍪</div>
          <div class="cookie-text">
            <h3 class="cookie-title">{{ t('cookie.preferences') }}</h3>
            <p class="cookie-description">
              {{ t('cookie.description') }}
              <a routerLink="/cookie-policy" class="link">{{ t('cookie.learn_more') }}</a>
            </p>

            <!-- Cookie Details (Collapsible) -->
            <div class="cookie-details" *ngIf="showDetails()">
              <div class="cookie-group">
                <label class="cookie-checkbox">
                  <input type="checkbox" [checked]="true" disabled class="checkbox">
                  <span class="checkbox-label">
                    <strong>{{ t('cookie.necessary_title') }}</strong>
                    <small>{{ t('cookie.necessary_desc') }}</small>
                  </span>
                </label>
              </div>

              <div class="cookie-group">
                <label class="cookie-checkbox">
                  <input type="checkbox" [checked]="cookieService.analyticsConsent()" 
                         (change)="toggleAnalytics($event)">
                  <span class="checkbox-label">
                    <strong>{{ t('cookie.analytics_title') }}</strong>
                    <small>{{ t('cookie.analytics_desc') }}</small>
                  </span>
                </label>
              </div>

              <div class="cookie-group">
                <label class="cookie-checkbox">
                  <input type="checkbox" [checked]="cookieService.marketingConsent()" 
                         (change)="toggleMarketing($event)">
                  <span class="checkbox-label">
                    <strong>{{ t('cookie.marketing_title') }}</strong>
                    <small>{{ t('cookie.marketing_desc') }}</small>
                  </span>
                </label>
              </div>
            </div>

            <!-- Toggle Details Button -->
            <button class="toggle-details-btn" (click)="toggleDetailsView()">
              {{ showDetails() ? t('cookie.hide_details') : t('cookie.show_details') }}
            </button>
          </div>
        </div>

        <!-- Cookie Actions -->
        <div class="cookie-actions">
          <button class="btn-secondary" (click)="rejectCookies()">
            {{ t('cookie.reject_all') }}
          </button>
          <button class="btn-primary" (click)="acceptCookies()">
            {{ t('cookie.accept_all') }}
          </button>
        </div>
      </div>

      <!-- Legal Reference -->
      <p class="gdpr-reference">
        {{ t('cookie.gdpr_compliance') }} <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj" target="_blank">GDPR</a> 
        | <a routerLink="/privacy-policy">{{ t('footer.privacy') }}</a>
      </p>
    </div>
  `,
  styleUrl: './cookie-banner.component.scss'
})
export class CookieBannerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  showDetails = signal<boolean>(false);
  analyticsChecked = signal<boolean>(false);
  marketingChecked = signal<boolean>(false);

  constructor(
    public cookieService: CookieConsentService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    this.translationService.onLanguageChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    // Initialize on language change
  }

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

  /**
   * Helper method for translations
   */
  t(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
