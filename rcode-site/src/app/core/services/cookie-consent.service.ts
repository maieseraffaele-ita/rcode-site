import { Injectable, signal } from '@angular/core';

/**
 * Service per la gestione del consenso ai cookie
 * Implementa la conformità GDPR (Regolamento UE 2016/679)
 */
@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  // Storage key per localStorage
  private readonly CONSENT_KEY = 'innova-cookie-consent';
  private readonly CONSENT_VERSION = 'v1';

  // Segnali reattivi per il stato del consenso
  cookieConsentShown = signal<boolean>(this.hasUserConsented() === null);
  analyticsConsent = signal<boolean>(false);
  marketingConsent = signal<boolean>(false);
  technicalConsent = signal<boolean>(true); // Sempre necessario

  constructor() {
    this.loadConsent();
  }

  /**
   * Salva il consenso dell'utente in localStorage
   * @param analytics - Consenso per cookie analytics
   * @param marketing - Consenso per cookie marketing
   */
  acceptConsent(analytics: boolean, marketing: boolean): void {
    const consent = {
      technical: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      version: this.CONSENT_VERSION
    };

    localStorage.setItem(this.CONSENT_KEY, JSON.stringify(consent));
    this.analyticsConsent.set(analytics);
    this.marketingConsent.set(marketing);
    this.cookieConsentShown.set(false);

    // Trigger analytics se accettati
    if (analytics) {
      this.initializeAnalytics();
    }

    // Trigger marketing se accettati
    if (marketing) {
      this.initializeMarketing();
    }
  }

  /**
   * Rifiuta tutti i cookie non essenziali
   */
  rejectConsent(): void {
    const consent = {
      technical: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: this.CONSENT_VERSION
    };

    localStorage.setItem(this.CONSENT_KEY, JSON.stringify(consent));
    this.analyticsConsent.set(false);
    this.marketingConsent.set(false);
    this.cookieConsentShown.set(false);
  }

  /**
   * Verifica se l'utente ha già dato il consenso
   * Ritorna null se no, true/false se sì
   */
  hasUserConsented(): boolean | null {
    const storedConsent = localStorage.getItem(this.CONSENT_KEY);
    return storedConsent ? JSON.parse(storedConsent).analytics : null;
  }

  /**
   * Carica il consenso salvato da localStorage
   */
  private loadConsent(): void {
    const storedConsent = localStorage.getItem(this.CONSENT_KEY);
    if (storedConsent) {
      try {
        const consent = JSON.parse(storedConsent);
        this.analyticsConsent.set(consent.analytics ?? false);
        this.marketingConsent.set(consent.marketing ?? false);
        this.cookieConsentShown.set(false);
      } catch (e) {
        console.warn('Error loading cookie consent', e);
      }
    }
  }

  /**
   * Inizializza Google Analytics se consenso accettato
   * Placeholder per integrazione reale
   */
  private initializeAnalytics(): void {
    console.log('Analytics cookies initialized');
    // Aggiungere codice Google Analytics/Matomo qui
  }

  /**
   * Inizializza cookie di marketing
   * Placeholder per integrazione reale
   */
  private initializeMarketing(): void {
    console.log('Marketing cookies initialized');
    // Aggiungere codice marketing here
  }

  /**
   * Resetta tutti i consensi
   */
  resetConsent(): void {
    localStorage.removeItem(this.CONSENT_KEY);
    this.analyticsConsent.set(false);
    this.marketingConsent.set(false);
    this.cookieConsentShown.set(true);
  }
}
