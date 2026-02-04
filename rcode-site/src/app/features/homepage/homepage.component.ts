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
            {{ t('home.hero_title') }}
            <span class="gradient-text">{{ t('home.hero_title_gradient') }}</span>
          </h1>
          <p class="hero-subtitle">
            {{ t('home.hero_subtitle') }}
          </p>
          <div class="hero-cta">
            <a routerLink="/contatti" class="btn-primary">
              {{ t('home.hero_cta_primary') }}
              <span class="arrow">→</span>
            </a>
            <a routerLink="/chi-siamo" class="btn-secondary">
              {{ t('home.hero_cta_secondary') }}
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <div class="stat-number">{{ t('home.hero_stat_1') }}</div>
              <div class="stat-label">{{ t('home.hero_stat_1_label') }}</div>
            </div>
            <div class="stat">
              <div class="stat-number">{{ t('home.hero_stat_2') }}</div>
              <div class="stat-label">{{ t('home.hero_stat_2_label') }}</div>
            </div>
            <div class="stat">
              <div class="stat-number">{{ t('home.hero_stat_3') }}</div>
              <div class="stat-label">{{ t('home.hero_stat_3_label') }}</div>
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
          <h2>{{ t('home.vp_title') }}</h2>
          <p>{{ t('home.vp_subtitle') }}</p>
        </div>

        <div class="value-grid">
          <div class="value-card">
            <div class="value-icon">🎯</div>
            <h3>{{ t('home.vp_card_1_title') }}</h3>
            <p>{{ t('home.vp_card_1_text') }}</p>
          </div>

          <div class="value-card">
            <div class="value-icon">🔧</div>
            <h3>{{ t('home.vp_card_2_title') }}</h3>
            <p>{{ t('home.vp_card_2_text') }}</p>
          </div>

          <div class="value-card">
            <div class="value-icon">🚀</div>
            <h3>{{ t('home.vp_card_3_title') }}</h3>
            <p>{{ t('home.vp_card_3_text') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Overview Section -->
    <section class="services-overview">
      <div class="section-container">
        <div class="section-header">
          <h2>{{ t('home.services_title') }}</h2>
          <p>{{ t('home.services_subtitle') }}</p>
        </div>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">🔄</div>
            <h3>{{ t('service.digital_transformation') }}</h3>
            <p>{{ t('service.digital_transformation_desc') }}</p>
            <a routerLink="/servizi" [fragment]="'digital-transformation'" class="service-link">
              {{ t('service.learn_more') }}
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">☁️</div>
            <h3>{{ t('service.cloud') }}</h3>
            <p>{{ t('service.cloud_desc') }}</p>
            <a routerLink="/servizi" [fragment]="'cloud'" class="service-link">
              {{ t('service.learn_more') }}
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">🤖</div>
            <h3>{{ t('service.ai') }}</h3>
            <p>{{ t('service.ai_desc') }}</p>
            <a routerLink="/servizi" [fragment]="'ai'" class="service-link">
              {{ t('service.learn_more') }}
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">🔒</div>
            <h3>{{ t('service.cybersecurity') }}</h3>
            <p>{{ t('service.cybersecurity_desc') }}</p>
            <a routerLink="/servizi" [fragment]="'cybersecurity'" class="service-link">
              {{ t('service.learn_more') }}
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">💻</div>
            <h3>{{ t('service.development') }}</h3>
            <p>{{ t('service.development_desc') }}</p>
            <a routerLink="/servizi" [fragment]="'development'" class="service-link">
              {{ t('service.learn_more') }}
            </a>
          </div>

          <div class="service-card">
            <div class="service-icon">📊</div>
            <h3>{{ t('service.consulting') }}</h3>
            <p>{{ t('service.consulting_desc') }}</p>
            <a routerLink="/servizi" [fragment]="'consulting'" class="service-link">
              {{ t('service.learn_more') }}
            </a>
          </div>
        </div>

        <div class="services-cta">
          <a routerLink="/servizi" class="btn-primary">
            {{ t('home.services_cta') }}
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
  constructor(
    private metaService: MetaService,
    protected translationService: TranslationService
  ) {}

  ngOnInit(): void {
    // Imposta i metadati SEO per la homepage
    this.metaService.setHomePageMeta();
  }

  /**
   * Metodo helper per accedere alle traduzioni nel template
   */
  t(key: string): string {
    return this.translationService.translate(key);
  }
}
