import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { TranslationService } from '../../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="industries-hero">
      <div class="container">
        <h1>{{ t('portfolio.hero_title') }}</h1>
        <p>{{ t('portfolio.hero_subtitle') }}</p>
      </div>
    </section>

    <section class="industries-section">
      <div class="container">
        <!-- E-Commerce Platform -->
        <div class="industry-item">
          <div class="industry-icon">🛒</div>
          <h2>E-Commerce Platform</h2>
          <p>Piattaforma e-commerce full-stack per azienda di moda italiana con supporto multi-valuta, multi-lingue e integrazioni di pagamento avanzate.</p>
          <div class="tech-stack">
            <span class="tech-badge">Angular</span>
            <span class="tech-badge">Node.js</span>
            <span class="tech-badge">PostgreSQL</span>
            <span class="tech-badge">AWS</span>
            <span class="tech-badge">Stripe</span>
          </div>
          <ul>
            <li>Frontend responsive con Angular 15+</li>
            <li>Backend REST API scalabile</li>
            <li>Integrazione Stripe & PayPal</li>
            <li>Gestione inventario real-time</li>
            <li>Dashboard admin completo</li>
          </ul>
        </div>

        <!-- SaaS Analytics Platform -->
        <div class="industry-item">
          <div class="industry-icon">📊</div>
          <h2>SaaS Analytics Platform</h2>
          <p>Piattaforma analytics B2B per monitoraggio metriche aziendali con dashboard real-time e reportistica avanzata.</p>
          <div class="tech-stack">
            <span class="tech-badge">Angular</span>
            <span class="tech-badge">TypeScript</span>
            <span class="tech-badge">Express.js</span>
            <span class="tech-badge">MongoDB</span>
            <span class="tech-badge">Kafka</span>
          </div>
          <ul>
            <li>Dashboard real-time con websockets</li>
            <li>Data visualization con Chart.js</li>
            <li>Export dati (PDF, Excel, CSV)</li>
            <li>Role-based access control</li>
            <li>API per integrazioni third-party</li>
          </ul>
        </div>

        <!-- Mobile App -->
        <div class="industry-item">
          <div class="industry-icon">📱</div>
          <h2>Mobile App (PWA)</h2>
          <p>Progressive Web App per gestione progetti personali con sincronizzazione offline-first e supporto multi-dispositivo.</p>
          <div class="tech-stack">
            <span class="tech-badge">Angular</span>
            <span class="tech-badge">Service Workers</span>
            <span class="tech-badge">Firebase</span>
            <span class="tech-badge">PWA</span>
            <span class="tech-badge">Responsive</span>
          </div>
          <ul>
            <li>Funzionamento offline completo</li>
            <li>Sincronizzazione dati automatica</li>
            <li>Notifiche push</li>
            <li>Responsive design mobile-first</li>
            <li>Installabile su home screen</li>
          </ul>
        </div>

        <!-- API RESTful -->
        <div class="industry-item">
          <div class="industry-icon">🔌</div>
          <h2>RESTful API Microservices</h2>
          <p>Architettura a microservizi con Docker per piattaforma cloud-native con scalabilità orizzontale e monitoring avanzato.</p>
          <div class="tech-stack">
            <span class="tech-badge">Node.js</span>
            <span class="tech-badge">Express.js</span>
            <span class="tech-badge">Docker</span>
            <span class="tech-badge">Kubernetes</span>
            <span class="tech-badge">PostgreSQL</span>
          </div>
          <ul>
            <li>Architettura a microservizi</li>
            <li>Containerizzazione Docker</li>
            <li>CI/CD pipeline automatizzate</li>
            <li>Monitoring con Prometheus</li>
            <li>Authentication OAuth2 & JWT</li>
          </ul>
        </div>

        <!-- Data Pipeline -->
        <div class="industry-item">
          <div class="industry-icon">🔄</div>
          <h2>Data Processing Pipeline</h2>
          <p>Pipeline ETL automatizzata per l'elaborazione di milioni di record quotidiani con garantita data quality e performance.</p>
          <div class="tech-stack">
            <span class="tech-badge">Node.js</span>
            <span class="tech-badge">PostgreSQL</span>
            <span class="tech-badge">Redis</span>
            <span class="tech-badge">AWS Lambda</span>
            <span class="tech-badge">CloudWatch</span>
          </div>
          <ul>
            <li>Elaborazione batch distribuita</li>
            <li>Validazione e cleaning dati</li>
            <li>Error handling e retry logic</li>
            <li>Logging e monitoring</li>
            <li>Scheduling con cron</li>
          </ul>
        </div>

        <!-- Content Management System -->
        <div class="industry-item">
          <div class="industry-icon">📝</div>
          <h2>Content Management System</h2>
          <p>CMS headless custom per agenzia di marketing con editor visuale avanzato e API per frontend decoupling.</p>
          <div class="tech-stack">
            <span class="tech-badge">Angular</span>
            <span class="tech-badge">Node.js</span>
            <span class="tech-badge">MongoDB</span>
            <span class="tech-badge">Supabase</span>
            <span class="tech-badge">REST API</span>
          </div>
          <ul>
            <li>Editor WYSIWYG intuitivo</li>
            <li>Gestione media e assets</li>
            <li>Versionamento contenuti</li>
            <li>API GraphQL & REST</li>
            <li>Multi-language support</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="industries-cta">
      <div class="container">
        <h2>Hai un'idea interessante?</h2>
        <p>Contattami per discutere come posso realizzare il tuo prossimo progetto</p>
        <a routerLink="/contatti" class="btn-primary">
          Inizia un progetto
          <span class="arrow">→</span>
        </a>
      </div>
    </section>
  `,
  styleUrl: './industries.component.scss'
})
export class IndustriesComponent implements OnInit, OnDestroy {
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
    this.metaService.setIndustriesPageMeta();
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
