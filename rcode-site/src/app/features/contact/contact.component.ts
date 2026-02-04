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
        <h1>Contattaci</h1>
        <p>Parliamo della tua trasformazione digitale</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <h2>Inviaci un messaggio</h2>
            <form (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-group">
                <label for="name">Nome completo *</label>
                <input 
                  type="text" 
                  id="name" 
                  [(ngModel)]="formData.name"
                  name="name"
                  required 
                  placeholder="Mario Rossi"
                >
              </div>

              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  [(ngModel)]="formData.email"
                  name="email"
                  required 
                  placeholder="mario@azienda.it"
                >
              </div>

              <div class="form-group">
                <label for="company">Azienda *</label>
                <input 
                  type="text" 
                  id="company" 
                  [(ngModel)]="formData.company"
                  name="company"
                  required 
                  placeholder="Tua Azienda SpA"
                >
              </div>

              <div class="form-group">
                <label for="service">Servizio di interesse *</label>
                <select 
                  id="service" 
                  [(ngModel)]="formData.service"
                  name="service"
                  required
                >
                  <option value="">Seleziona un servizio</option>
                  <option value="digital-transformation">Trasformazione Digitale</option>
                  <option value="cloud">Cloud & Infrastructure</option>
                  <option value="ai">AI & Data</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="development">Application Development</option>
                  <option value="consulting">Consulting & Strategy</option>
                  <option value="other">Altro</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Messaggio *</label>
                <textarea 
                  id="message" 
                  [(ngModel)]="formData.message"
                  name="message"
                  rows="5"
                  required 
                  placeholder="Descrivi brevemente il tuo progetto e le tue esigenze..."
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
                <label for="gdpr">Ho letto e accetto la <a href="/privacy-policy">Privacy Policy</a> *</label>
              </div>

              <button type="submit" class="btn-primary" [disabled]="isSubmitting()">
                {{ isSubmitting() ? 'Invio in corso...' : 'Invia Messaggio' }}
              </button>

              <div *ngIf="submitSuccess()" class="success-message">
                ✓ Messaggio inviato con successo! Ti contatteremo presto.
              </div>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="contact-info">
            <div class="info-card">
              <h3>Sede Principale</h3>
              <p>
                <strong>Milano</strong><br>
                Via Innovazione 42<br>
                20100 Milano (MI)<br>
                <a href="tel:+390287654321">+39 02 8765 4321</a>
              </p>
            </div>

            <div class="info-card">
              <h3>Ufficio Roma</h3>
              <p>
                <strong>Roma</strong><br>
                Via della Tecnologia 15<br>
                00100 Roma (RM)<br>
                <a href="tel:+390612345678">+39 06 1234 5678</a>
              </p>
            </div>

            <div class="info-card">
              <h3>Email</h3>
              <p>
                <strong>Info generali:</strong><br>
                <a href="mailto:info@innovatetech.it">info@innovatetech.it</a><br><br>
                <strong>Vendite:</strong><br>
                <a href="mailto:sales@innovatetech.it">sales@innovatetech.it</a><br><br>
                <strong>Supporto:</strong><br>
                <a href="mailto:support@innovatetech.it">support@innovatetech.it</a>
              </p>
            </div>

            <div class="info-card">
              <h3>Social Media</h3>
              <div class="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noopener">Twitter</a>
                <a href="https://github.com" target="_blank" rel="noopener">GitHub</a>
              </div>
            </div>

            <div class="office-hours">
              <h3>Orari di ufficio</h3>
              <p>
                Lunedì - Venerdì: 9:00 - 18:00<br>
                Sabato - Domenica: Chiuso<br>
                <br>
                <em>Risponderemo a tutte le richieste entro 24 ore lavorative</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section (placeholder) -->
    <section class="contact-map">
      <div class="container">
        <h2>Trovaci</h2>
        <div class="map-placeholder">
          <p>Mappa interattiva con le nostre sedi</p>
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
    this.metaService.setContactPageMeta();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      alert('Per favore completa tutti i campi obbligatori');
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
