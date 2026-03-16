import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetaService } from '../../core/services/meta.service';
import { TranslationService } from '../../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="contact-hero">
      <div class="container">
        <h1>{{ t('contact.hero_title') }}</h1>
        <p>{{ t('contact.hero_subtitle') }}</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <h2>{{ t('contact.form_title') }}</h2>
            <form (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-group">
                <label for="name">{{ t('contact.form_name') }} *</label>
                <input
                  type="text"
                  id="name"
                  [(ngModel)]="formData.name"
                  name="name"
                  required
                  [placeholder]="t('contact.form_name')"
                >
              </div>

              <div class="form-group">
                <label for="email">{{ t('contact.form_email') }} *</label>
                <input
                  type="email"
                  id="email"
                  [(ngModel)]="formData.email"
                  name="email"
                  required
                  [placeholder]="t('contact.form_email')"
                >
              </div>

              <div class="form-group">
                <label for="company">Compagnia/Progetto *</label>
                <input
                  type="text"
                  id="company"
                  [(ngModel)]="formData.company"
                  name="company"
                  [placeholder]="'Il tuo progetto o compagnia'"
                >
              </div>

              <div class="form-group">
                <label for="service">Tipo di Collaborazione *</label>
                <select
                  id="service"
                  [(ngModel)]="formData.service"
                  name="service"
                  required
                >
                  <option value="">Seleziona tipo di collaborazione</option>
                  <option value="project">Progetto Specifico</option>
                  <option value="consulting">Consulenza Tecnica</option>
                  <option value="mentoring">Mentoring & Training</option>
                  <option value="contract">Contratto Orario</option>
                  <option value="fulltime">Full-Time</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Altro</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">{{ t('contact.form_message') }} *</label>
                <textarea
                  id="message"
                  [(ngModel)]="formData.message"
                  name="message"
                  rows="5"
                  required
                  [placeholder]="t('contact.form_message_placeholder')"
                ></textarea>
              </div>

              <div class="form-group checkbox">
                <input
                  type="checkbox"
                  id="gdpr"
                  [(ngModel)]="formData.gdpr"
                  name="gdpr"
                  required
                >
                <label for="gdpr">{{ t('contact.form_gdpr') }} <a href="/privacy-policy">{{ t('footer.privacy') }}</a> *</label>
              </div>

              <button type="submit" class="btn-primary" [disabled]="isSubmitting()">
                {{ isSubmitting() ? t('contact.form_submitting') : t('contact.form_submit') }}
              </button>

              <div *ngIf="submitSuccess()" class="success-message">
                {{ t('contact.form_success') }}
              </div>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="contact-info">
            <div class="info-card">
              <h3>Email</h3>
              <p>
                <a href="mailto:raffaele@rcode.it">raffaele@rcode.it</a><br>
                <small>Risponderò entro 24 ore</small>
              </p>
            </div>

            <div class="info-card">
              <h3>{{ t('contact.social') }}</h3>
              <div class="social-links">
                <a href="https://linkedin.com/in/raffaelemaiese" target="_blank" rel="noopener noreferrer" title="LinkedIn" class="social-link linkedin">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="https://github.com/maieseraffaele-ita" target="_blank" rel="noopener noreferrer" title="GitHub" class="social-link github">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.75 16 2.48a13.38 13.38 0 00-7 0C6.27.75 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V21"/>
                  </svg>
                </a>
                <a href="https://instagram.com/raffaelemaiese" target="_blank" rel="noopener noreferrer" title="Instagram" class="social-link instagram">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <circle cx="17.5" cy="6.5" r="1.5"/>
                  </svg>
                </a>
                <a href="https://facebook.com/raffaelemaiese" target="_blank" rel="noopener noreferrer" title="Facebook" class="social-link facebook">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div class="info-card">
              <h3>Ubicazione</h3>
              <p>
                Based in Italia 🇮🇹<br>
                <small>Disponibile per collaborazioni remote e on-site</small>
              </p>
            </div>

            <div class="info-card">
              <h3>{{ t('contact.office_hours') }}</h3>
              <p>
                Lunedì - Venerdì: 9:00 - 18:00<br>
                Sabato - Domenica: Chiuso<br>
                <br>
                <em>Risponderò a tutte le richieste entro 24 ore lavorative</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section (placeholder) -->
    <section class="contact-map">
      <div class="container">
        <h2>{{ t('contact.location_finder') }}</h2>
        <div class="map-placeholder">
          <p>{{ t('contact.location_map_description') }}</p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);

  formData = {
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    gdpr: false
  };

  constructor(
    private metaService: MetaService,
    protected translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
    this.translationService.onLanguageChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.metaService.setContactPageMeta();
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

  onSubmit(): void {
    if (!this.isFormValid()) {
      alert(this.t('contact.form_validation_error'));
      return;
    }

    this.isSubmitting.set(true);

    // Simula invio del form (in produzione, fare una vera API call)
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);

      // Reset form
      this.resetForm();

      // Nascondi il messaggio di successo dopo 5 secondi
      setTimeout(() => {
        this.submitSuccess.set(false);
      }, 5000);
    }, 1500);
  }

  private isFormValid(): boolean {
    return this.formData.name.trim() !== '' &&
           this.formData.email.trim() !== '' &&
           this.formData.company.trim() !== '' &&
           this.formData.service.trim() !== '' &&
           this.formData.message.trim() !== '' &&
           this.formData.gdpr === true;
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
      gdpr: false
    };
  }
}
