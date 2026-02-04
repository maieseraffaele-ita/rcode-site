import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { TranslationService } from '../../core/services/translation.service';

/**
 * Componente Homepage
 * Sezione principale del sito con hero section, value proposition e highlights
 */
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Trasforma il tuo business
            <span class="gradient-text">con la giusta tecnologia</span>
          </h1>
          <p class="hero-subtitle">
            Partner strategico per la trasformazione digitale. Combiniamo competenza tecnologica, 
            innovazione e risultati misurabili per accelerare la crescita della tua azienda.
          </p>
          <div class="hero-cta">
            <a routerLink="/contatti" class="btn-primary">
              Richiedi una consulenza gratuita
              <span class="arrow">→</span>
            </a>
            <a routerLink="/chi-siamo" class="btn-secondary">
              Scopri di più su di noi
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <div class="stat-number">500+</div>
              <div class="stat-label">Progetti completati</div>
            </div>
            <div class="stat">
              <div class="stat-number">15+</div>
              <div class="stat-label">Anni di esperienza</div>
            </div>
            <div class="stat">
              <div class="stat-number">98%</div>
              <div class="stat-label">Client satisfaction</div>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-image">
            <div class="floating-card card-1">
              <span class="icon">☁️</span>
              <span class="label">Cloud</span>
            </div>
            <div class="floating-card card-2">
              <span class="icon">🤖</span>
              <span class="label">AI & ML</span>
            </div>
            <div class="floating-card card-3">
              <span class="icon">🔒</span>
              <span class="label">Security</span>
            </div>
            <div class="hero-shape"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Proposition Section -->
    <section class="value-proposition">
      <div class="section-container">
        <div class="section-header">
          <h2>Perché scegliere Innova Tech Solutions?</h2>
          <p>Tre pilastri che guidano il nostro approccio strategico</p>
        </div>

        <div class="value-grid">
          <div class="value-card">
            <div class="value-icon">🎯</div>
            <h3>Risultati Misurabili</h3>
            <p>
              Ogni progetto è strutturato con KPI chiari e ROI tracciabile. 
              Non proponiamo solo soluzioni: proponiamo crescita quantificabile.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">🔧</div>
            <h3>Competenza Tecnica</h3>
            <p>
              Team di esperti certificati con expertise in cloud, AI, cybersecurity 
              e sviluppo applicazioni enterprise.
            </p>
          </div>

          <div class="value-card">
            <div class="value-icon">🚀</div>
            <h3>Innovazione Continua</h3>
            <p>
              Rimaniamo sempre ai vertici delle nuove tecnologie. 
              La trasformazione digitale non è una destinazione, è un percorso.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Overview Section -->
    <section class="services-overview">
      <div class="section-container">
        <div class="section-header">
          <h2>I nostri servizi principali</h2>
          <p>Soluzioni complete per la trasformazione digitale del tuo business</p>
        </div>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🔄</div>
            <h3>Trasformazione Digitale</h3>
            <p>
              Ripensa i tuoi processi con tecnologie moderne. 
              Dalla strategia all'implementazione, ti guidiamo in ogni fase.
            </p>
            <a routerLink="/servizi" [fragment]="'digital-transformation'" class="service-link">
              Scopri di più →
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">☁️</div>
            <h3>Cloud & Infrastructure</h3>
            <p>
              Sfrutta la scalabilità del cloud. 
              Migrazione, architettura e ottimizzazione dei costi.
            </p>
            <a routerLink="/servizi" [fragment]="'cloud'" class="service-link">
              Scopri di più →
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">🤖</div>
            <h3>Artificial Intelligence & Data</h3>
            <p>
              Estrai valore dai tuoi dati con intelligenza artificiale. 
              Machine Learning e analytics predittive.
            </p>
            <a routerLink="/servizi" [fragment]="'ai'" class="service-link">
              Scopri di più →
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">🔒</div>
            <h3>Cybersecurity</h3>
            <p>
              Proteggi i tuoi asset digitali. 
              Compliance, vulnerability assessment e threat protection.
            </p>
            <a routerLink="/servizi" [fragment]="'cybersecurity'" class="service-link">
              Scopri di più →
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">💻</div>
            <h3>Application Development</h3>
            <p>
              Soluzioni software custom per le tue esigenze. 
              Web, mobile e API enterprise-ready.
            </p>
            <a routerLink="/servizi" [fragment]="'development'" class="service-link">
              Scopri di più →
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">📊</div>
            <h3>Consulting & Strategy</h3>
            <p>
              Allineamento tra IT e business. 
              Roadmap tecnologico per accelerare la tua crescita.
            </p>
            <a routerLink="/servizi" [fragment]="'consulting'" class="service-link">
              Scopri di più →
            </a>
          </div>
        </div>

        <div class="services-cta">
          <a routerLink="/servizi" class="btn-primary">
            Esplora tutti i servizi
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Industries Section -->
    <section class="industries-preview">
      <div class="section-container">
        <div class="section-header">
          <h2>Soluzioni per ogni industria</h2>
          <p>Expertise verticale in settori mission-critical</p>
        </div>

        <div class="industries-grid">
          <div class="industry-card">
            <div class="industry-icon">🏦</div>
            <h3>Finance</h3>
            <p>Innovazione nel settore finanziario con compliance e sicurezza.</p>
          </div>
          <div class="industry-card">
            <div class="industry-icon">🏥</div>
            <h3>Healthcare</h3>
            <p>Soluzioni sanitarie che mettono la paziente al centro.</p>
          </div>
          <div class="industry-card">
            <div class="industry-icon">🏭</div>
            <h3>Manufacturing</h3>
            <p>Industria 4.0 e ottimizzazione della produzione.</p>
          </div>
          <div class="industry-card">
            <div class="industry-icon">🏛️</div>
            <h3>Pubblica Amministrazione</h3>
            <p>Digitalizzazione della PA con standard AGID.</p>
          </div>
          <div class="industry-card">
            <div class="industry-icon">🛍️</div>
            <h3>Retail</h3>
            <p>Omnichannel e customer experience digitale.</p>
          </div>
        </div>

        <div class="industries-cta">
          <a routerLink="/industrie" class="btn-primary">
            Scopri le soluzioni per industria
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Call to Action Final Section -->
    <section class="final-cta">
      <div class="section-container">
        <div class="cta-content">
          <h2>Pronto a trasformare il tuo business?</h2>
          <p>
            Contattaci oggi per una consulenza strategica gratuita. 
            Scopri come possiamo accelerare la tua trasformazione digitale.
          </p>
          <a routerLink="/contatti" class="btn-primary btn-large">
            Richiedi una consulenza
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    // Imposta i metadati SEO per la homepage
    this.metaService.setHomePageMeta();
  }
}
