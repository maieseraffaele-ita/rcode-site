import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { TranslationService } from '../../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Componente Skills & Expertise
 * Mostra le competenze principali e tecnologie utilizzate
 */
@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section -->
    <section class="services-hero">
      <div class="container">
        <h1>{{ t('services.hero_title') }}</h1>
        <p>{{ t('services.hero_subtitle') }}</p>
      </div>
    </section>

    <!-- Skills Detailed Section -->
    <section class="services-detailed">
      <div class="container">
        <!-- Frontend -->
        <div class="service-detail" id="frontend">
          <div class="service-header">
            <span class="service-icon">🎨</span>
            <h2>Frontend Development</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                Creo interfacce web moderne, responsive e accessibili usando le tecnologie frontend più attuali.
              </p>
              <h3>Competenze:</h3>
              <ul>
                <li>Angular 15+ (Standalone Components, RxJS)</li>
                <li>TypeScript & Modern JavaScript</li>
                <li>Responsive Design & Mobile First</li>
                <li>CSS3, SCSS, Tailwind CSS</li>
                <li>State Management (Signals, NgRx)</li>
                <li>Web Accessibility (A11y)</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Focus:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">⚡</span>
                  <span>Performance Optimization</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">📱</span>
                  <span>Mobile Responsive</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">♿</span>
                  <span>Accessible & Inclusive</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div class="service-detail" id="backend">
          <div class="service-header">
            <span class="service-icon">⚙️</span>
            <h2>Backend Development</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                Sviluppo API robuste, scalabili e sicure con architetture moderne e best practices.
              </p>
              <h3>Competenze:</h3>
              <ul>
                <li>Node.js & Express.js</li>
                <li>RESTful APIs & GraphQL</li>
                <li>Database Design (SQL & NoSQL)</li>
                <li>Authentication & Authorization</li>
                <li>Microservices Architecture</li>
                <li>API Documentation & Testing</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Focus:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">🔒</span>
                  <span>Security First</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">📈</span>
                  <span>Scalable Design</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">🧪</span>
                  <span>Well Tested Code</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Database & Data -->
        <div class="service-detail" id="data">
          <div class="service-header">
            <span class="service-icon">💾</span>
            <h2>Database & Data Solutions</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                Progetto e implemento database efficienti e ottimizzati, con focus su performance e data integrity.
              </p>
              <h3>Competenze:</h3>
              <ul>
                <li>PostgreSQL, MySQL, MariaDB</li>
                <li>MongoDB, Firebase, Supabase</li>
                <li>Database Design & Optimization</li>
                <li>Data Modeling & ER Diagrams</li>
                <li>Query Optimization</li>
                <li>Backup & Disaster Recovery</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Focus:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">⚡</span>
                  <span>High Performance</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">🔐</span>
                  <span>Data Protection</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">📊</span>
                  <span>Optimal Indexing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- DevOps & Cloud -->
        <div class="service-detail" id="devops">
          <div class="service-header">
            <span class="service-icon">☁️</span>
            <h2>DevOps & Cloud Infrastructure</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                Configuro e gestisco infrastrutture cloud moderne con CI/CD pipelines automatizzate.
              </p>
              <h3>Competenze:</h3>
              <ul>
                <li>AWS (EC2, S3, Lambda, RDS)</li>
                <li>Google Cloud Platform (GCP)</li>
                <li>Docker & Container Orchestration</li>
                <li>CI/CD (GitHub Actions, GitLab CI)</li>
                <li>Infrastructure as Code (Terraform)</li>
                <li>Monitoring & Logging</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Focus:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">🚀</span>
                  <span>Automated Deployment</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">💰</span>
                  <span>Cost Optimization</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">🛡️</span>
                  <span>High Availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Web & Full Stack -->
        <div class="service-detail" id="fullstack">
          <div class="service-header">
            <span class="service-icon">🌐</span>
            <h2>Full-Stack Web Solutions</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                Sviluppo end-to-end di applicazioni web complete, dal design alla deployment in production.
              </p>
              <h3>Competenze:</h3>
              <ul>
                <li>Full-Stack Development</li>
                <li>Progressive Web Apps (PWA)</li>
                <li>E-commerce Solutions</li>
                <li>CMS Integration</li>
                <li>Web Performance Optimization</li>
                <li>SEO Optimization</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Focus:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">📈</span>
                  <span>Business Growth</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">⚡</span>
                  <span>Fast Load Times</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">🔍</span>
                  <span>SEO Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Consulting & Code Review -->
        <div class="service-detail" id="consulting">
          <div class="service-header">
            <span class="service-icon">👨‍💻</span>
            <h2>Consulting & Code Review</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                Assisto progetti esistenti con code review, ottimizzazione e mentoring del team tecnico.
              </p>
              <h3>Competenze:</h3>
              <ul>
                <li>Technical Code Review</li>
                <li>Architecture Assessment</li>
                <li>Performance Profiling & Optimization</li>
                <li>Technical Documentation</li>
                <li>Team Mentoring & Training</li>
                <li>Best Practices Implementation</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Focus:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">✅</span>
                  <span>Code Quality</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">📚</span>
                  <span>Knowledge Transfer</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">🎯</span>
                  <span>Best Practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Engagement Models -->
    <section class="engagement-models">
      <div class="container">
        <h2>Modalità di Collaborazione</h2>
        <p class="section-subtitle">Flessibilità nel come lavorare insieme</p>
        
        <div class="models-grid">
          <div class="model-card">
            <h3>Progetti Specifici</h3>
            <p>Scope definito e timeline chiara per progetti web e software custom.</p>
          </div>
          <div class="model-card">
            <h3>Contratti Orari</h3>
            <p>Flessibilità oraria per lavori con requisiti in evoluzione o supporto continuativo.</p>
          </div>
          <div class="model-card">
            <h3>Consulenza Tecnica</h3>
            <p>Supporto ad progetto per code review, architettura e ottimizzazioni.</p>
          </div>
          <div class="model-card">
            <h3>Mentoring & Training</h3>
            <p>Affiancamento del team e formazione su tecnologie e best practices.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="services-cta">
      <div class="container">
        <h2>Hai un progetto interessante?</h2>
        <p>Contattami per discutere come posso aiutare il tuo progetto</p>
        <a routerLink="/contatti" class="btn-primary">
          Iniziamo una collaborazione
          <span class="arrow">→</span>
        </a>
      </div>
    </section>
  `,
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

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
    this.metaService.setServicesPageMeta();
  }

  // Helper method for translations
  t(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
