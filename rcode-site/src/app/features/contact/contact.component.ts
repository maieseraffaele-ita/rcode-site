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
                <a href="https://linkedin.com/in/raffaelemaiese" target="_blank" rel="noopener">LinkedIn</a>
                <a href="https://github.com/maieseraffaele-ita" target="_blank" rel="noopener">GitHub</a>
                <a href="https://twitter.com/raffaele" target="_blank" rel="noopener">Twitter</a>
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
