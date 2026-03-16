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
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.818 0-9.753h3.554v1.381c.43-.662 1.191-1.602 2.901-1.602 2.121 0 3.712 1.388 3.712 4.369v5.605zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.771-1.715 1.921-1.715 1.147 0 1.918.76 1.94 1.715 0 .953-.791 1.715-1.946 1.715zm-1.6 11.597h3.189V9.694H3.737v10.758zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://github.com/maieseraffaele-ita" target="_blank" rel="noopener noreferrer" title="GitHub" class="social-link github">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/raffaele" target="_blank" rel="noopener noreferrer" title="X (Twitter)" class="social-link twitter">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.802-5.997 6.802H2.16l7.73-8.835L1.126 2.25h6.84l4.713 6.231 5.449-6.231zM17.002 18.807h1.844L6.962 3.923H5.033l11.969 14.884z"/>
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
