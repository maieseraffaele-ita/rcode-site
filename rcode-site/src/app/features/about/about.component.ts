import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { TranslationService } from '../../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * About Component - Personal Bio & Journey
 * Mostra la biografia personale, il percorso professionale e le competenze
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <h1>{{ t('about.hero_title') }}</h1>
        <p>{{ t('about.hero_subtitle') }}</p>
      </div>
    </section>

    <!-- Personal Story -->
    <section class="company-story">
      <div class="container">
        <div class="story-grid">
          <div class="story-text">
            <h2>{{ t('about.story_title') }}</h2>
            <p>
              Ciao! Sono un Full-stack Developer italiano appassionato di tecnologia e problem solving.
              Ho iniziato il mio percorso nell'informatica oltre 8 anni fa e da allora ho lavorato su 
              progetti diverse negli ambiti web, cloud e data.
            </p>
            <p>
              La mia filosofia è semplice: creare soluzioni software di qualità, mantenibile e scalabile.
              Non mi piace il "quick and dirty" - preferisco investire un po' più di tempo per scrivere 
              codice pulito che sia un piacere mantenere.
            </p>
            <p>
              Quando non sto codificando, mi piace imparare nuove tecnologie, leggere articoli tech
              e contribuire a progetti open source. Credo nel continuous learning e nella condivisione
              della conoscenza con la comunità.
            </p>
          </div>
          <div class="story-visual">
            <div class="timeline">
              <div class="timeline-item">
                <span class="year">2016</span>
                <span class="event">Inizio del percorso nello sviluppo web</span>
              </div>
              <div class="timeline-item">
                <span class="year">2017</span>
                <span class="event">Prima esperienza professionale come developer</span>
              </div>
              <div class="timeline-item">
                <span class="year">2018</span>
                <span class="event">Specializzazione in Frontend (Angular)</span>
              </div>
              <div class="timeline-item">
                <span class="year">2019</span>
                <span class="event">Passaggio a Full-Stack Development</span>
              </div>
              <div class="timeline-item">
                <span class="year">2021</span>
                <span class="event">Expertise in Cloud & DevOps</span>
              </div>
              <div class="timeline-item">
                <span class="year">2024</span>
                <span class="event">Focus su soluzioni enterprise-grade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills & Focus Areas -->
    <section class="mvv">
      <div class="container">
        <div class="mvv-grid">
          <div class="mvv-card primary">
            <h3>Cosa mi Piace Fare</h3>
            <p>
              Mi piace lavorare su sfide tecniche interessanti dove posso usare le mie competenze
              per creare soluzioni che fanno realmente la differenza. Preferisco collaborare con team
              appassionati e clienti che capiscono il valore di un codice ben fatto.
            </p>
          </div>
          <div class="mvv-card">
            <h3>Approccio Metodologico</h3>
            <p>
              Credo nel TDD, SOLID principles e architetture pulite. Non mi fermo a "funziona",
              mi chiedo "è mantenibile? è scalabile? è testato?". La performance e la sicurezza
              sono sempre prioritari.
            </p>
          </div>
          <div class="mvv-card">
            <h3>Valori Professionali</h3>
            <ul>
              <li><strong>Qualità:</strong> Codice ben scritto e testato</li>
              <li><strong>Comunicazione:</strong> Chiarezza e trasparenza</li>
              <li><strong>Curiosità:</strong> Sempre voglia di imparare</li>
              <li><strong>Responsabilità:</strong> Impegno verso i progetti</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack & Expertise -->
    <section class="team-culture">
      <div class="container">
        <h2>Tech Stack & Expertise</h2>
        <p class="section-subtitle">Tecnologie e linguaggi che padroneggio</p>
        
        <div class="culture-grid">
          <div class="culture-item">
            <div class="icon">🎨</div>
            <h3>Frontend</h3>
            <p>Angular, TypeScript, RxJS, SCSS, HTML5, Responsive Design, Web Accessibility</p>
          </div>
          <div class="culture-item">
            <div class="icon">⚙️</div>
            <h3>Backend</h3>
            <p>Node.js, Express.js, REST APIs, GraphQL, Authentication, Microservices</p>
          </div>
          <div class="culture-item">
            <div class="icon">💾</div>
            <h3>Database</h3>
            <p>PostgreSQL, MySQL, MongoDB, Firebase, Supabase, Database Design & Optimization</p>
          </div>
          <div class="culture-item">
            <div class="icon">☁️</div>
            <h3>Cloud & DevOps</h3>
            <p>AWS, GCP, Docker, CI/CD, GitHub Actions, Infrastructure as Code, Linux</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications & Learning -->
    <section class="certifications">
      <div class="container">
        <h2>Certificazioni & Formazione</h2>
        <p class="section-subtitle">Continuo a investire nella mia crescita professionale</p>
        
        <div class="certs-grid">
          <div class="cert-item">
            <span class="cert-badge">AWS Certified</span>
            <p>AWS Solutions Architect Associate</p>
          </div>
          <div class="cert-item">
            <span class="cert-badge">Docker Certified</span>
            <p>Docker Certified Associate</p>
          </div>
          <div class="cert-item">
            <span class="cert-badge">Google Cloud</span>
            <p>Professional Cloud Architect</p>
          </div>
          <div class="cert-item">
            <span class="cert-badge">Full-Stack</span>
            <p>Multiple courses & training programs</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="about-cta">
      <div class="container">
        <h2>Vuoi collaborare?</h2>
        <p>Scopri i miei progetti nel portfolio e contattami per discutere una possibile collaborazione</p>
        <a routerLink="/industrie" class="btn-primary">
          Vedi il mio portfolio
          <span class="arrow">→</span>
        </a>
      </div>
    </section>
  `,
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
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
    this.metaService.setAboutPageMeta();
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
