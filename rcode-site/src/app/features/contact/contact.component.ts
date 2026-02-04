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
                <label for="company">{{ t('contact.form_company') }} *</label>
                <input
                  type="text"
                  id="company"
                  [(ngModel)]="formData.company"
                  name="company"
                  required
                  [placeholder]="t('contact.form_company')"
                >
              </div>

              <div class="form-group">
                <label for="service">{{ t('contact.form_service') }} *</label>
                <select
                  id="service"
                  [(ngModel)]="formData.service"
                  name="service"
                  required
                >
                  <option value="">{{ t('contact.form_service_select') }}</option>
                  <option value="digital-transformation">{{ t('service.digital_transformation') }}</option>
                  <option value="cloud">{{ t('service.cloud') }}</option>
                  <option value="ai">{{ t('service.ai') }}</option>
                  <option value="cybersecurity">{{ t('service.cybersecurity') }}</option>
                  <option value="development">{{ t('service.development') }}</option>
                  <option value="consulting">{{ t('service.consulting') }}</option>
                  <option value="other">{{ t('contact.form_service_other') }}</option>
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
              <h3>{{ t('contact.headquarters') }}</h3>
              <p>
                <strong>Milano</strong><br>
                Via Innovazione 42<br>
                20100 Milano (MI)<br>
                <a href="tel:+390287654321">+39 02 8765 4321</a>
              </p>
            </div>

            <div class="info-card">
              <h3>{{ t('contact.office_rome') }}</h3>
              <p>
                <strong>Roma</strong><br>
                Via della Tecnologia 15<br>
                00100 Roma (RM)<br>
                <a href="tel:+390612345678">+39 06 1234 5678</a>
              </p>
            </div>

            <div class="info-card">
              <h3>{{ t('contact.email') }}</h3>
              <p>
                <strong>{{ t('contact.email_general') }}</strong><br>
                <a href="mailto:info@rcode.it">info@rcode.it</a><br><br>
                <strong>{{ t('contact.email_sales') }}</strong><br>
                <a href="mailto:sales@rcode.it">sales@rcode.it</a><br><br>
                <strong>{{ t('contact.email_support') }}</strong><br>
                <a href="mailto:support@rcode.it">support@rcode.it</a>
              </p>
            </div>

            <div class="info-card">
              <h3>{{ t('contact.social') }}</h3>
              <div class="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a>
                <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
              </div>
            </div>

            <div class="office-hours">
              <h3>{{ t('contact.office_hours') }}</h3>
              <p>
                {{ t('contact.office_hours_weekday') }}<br>
                {{ t('contact.office_hours_weekend') }}<br>
                <br>
                <em>{{ t('contact.office_hours_response') }}</em>
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
