import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { TranslationService } from '../../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="careers-hero">
      <div class="container">
        <h1>{{ t('careers.hero_title') }}</h1>
        <p>{{ t('careers.hero_subtitle') }}</p>
      </div>
    </section>

    <!-- Current Status -->
    <section class="culture-section">
      <div class="container">
        <h2>{{ t('careers.status_title') }}</h2>
        <p class="status-description">{{ t('careers.status_description') }}</p>
        
        <div class="culture-grid">
          <div class="culture-card">
            <span class="icon">💼</span>
            <h3>Progetti Full-Time</h3>
            <p>Disponibile per ingaggi a tempo pieno su progetti interessanti con team appassionati</p>
          </div>
          <div class="culture-card">
            <span class="icon">🤝</span>
            <h3>Progetti Freelance</h3>
            <p>Lavori su base oraria o a progetto con massima flessibilità di timeline</p>
          </div>
          <div class="culture-card">
            <span class="icon">📚</span>
            <h3>Mentoring & Consulting</h3>
            <p>Code review, technical consulting e mentoring per team tecnici</p>
          </div>
          <div class="culture-card">
            <span class="icon">🔄</span>
            <h3>Collaborazioni</h3>
            <p>Partnership con agenzie e altre ditte per progetti comuni</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="positions-section">
      <div class="container">
        <h2>{{ t('careers.skills_title') }}</h2>
        <p class="section-subtitle">Le aree nelle quali posso dare massimo valore</p>
        
        <div class="positions-grid">
          <div class="position-card">
            <span class="skill-icon">🎨</span>
            <h3>Frontend Development</h3>
            <p>Angular, TypeScript, SCSS, Responsive Design e Web Accessibility</p>
            <div class="expertise-level">
              <div class="level-bar" style="width: 95%;"></div>
              <span>Expert</span>
            </div>
          </div>

          <div class="position-card">
            <span class="skill-icon">⚙️</span>
            <h3>Backend Development</h3>
            <p>Node.js, Express, REST APIs, Database Design e Microservices</p>
            <div class="expertise-level">
              <div class="level-bar" style="width: 90%;"></div>
              <span>Expert</span>
            </div>
          </div>

          <div class="position-card">
            <span class="skill-icon">☁️</span>
            <h3>Cloud & DevOps</h3>
            <p>AWS, GCP, Docker, CI/CD Pipelines e Infrastructure as Code</p>
            <div class="expertise-level">
              <div class="level-bar" style="width: 85%;"></div>
              <span>Advanced</span>
            </div>
          </div>

          <div class="position-card">
            <span class="skill-icon">💾</span>
            <h3>Database Design</h3>
            <p>PostgreSQL, MySQL, MongoDB e Query Optimization</p>
            <div class="expertise-level">
              <div class="level-bar" style="width: 88%;"></div>
              <span>Advanced</span>
            </div>
          </div>

          <div class="position-card">
            <span class="skill-icon">🧪</span>
            <h3>Testing & QA</h3>
            <p>Unit Tests, Integration Tests, E2E Testing e Test Automation</p>
            <div class="expertise-level">
              <div class="level-bar" style="width: 85%;"></div>
              <span>Advanced</span>
            </div>
          </div>

          <div class="position-card">
            <span class="skill-icon">🚀</span>
            <h3>Full-Stack Solutions</h3>
            <p>End-to-end development da concept a production deployment</p>
            <div class="expertise-level">
              <div class="level-bar" style="width: 92%;"></div>
              <span>Expert</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section class="benefits-section">
      <div class="container">
        <h2>{{ t('careers.experience_title') }}</h2>
        <div class="experience-timeline">
          <div class="timeline-entry">
            <div class="timeline-date">2024</div>
            <div class="timeline-content">
              <h3>Full-Stack Developer - Freelance</h3>
              <p>Realizzazione di soluzioni web custom per clienti internazionali</p>
            </div>
          </div>
          <div class="timeline-entry">
            <div class="timeline-date">2023</div>
            <div class="timeline-content">
              <h3>Senior Frontend Developer</h3>
              <p>Leadership di team frontend, architettura Angular, mentoring</p>
            </div>
          </div>
          <div class="timeline-entry">
            <div class="timeline-date">2021</div>
            <div class="timeline-content">
              <h3>Full-Stack Developer</h3>
              <p>Transizione a Full-Stack, acquisizione expertise Cloud e DevOps</p>
            </div>
          </div>
          <div class="timeline-entry">
            <div class="timeline-date">2019</div>
            <div class="timeline-content">
              <h3>Angular Developer</h3>
              <p>Specializzazione in Angular framework e RxJS</p>
            </div>
          </div>
          <div class="timeline-entry">
            <div class="timeline-date">2016</div>
            <div class="timeline-content">
              <h3>Junior Web Developer</h3>
              <p>Inizio del percorso nel web development, HTML/CSS/JavaScript</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Collaboration Models -->
    <section class="models-section">
      <div class="container">
        <h2>Modalità di Collaborazione</h2>
        <div class="models-grid">
          <div class="model-card">
            <span class="model-icon">📋</span>
            <h3>Progetti Fissi</h3>
            <p>Scope, timeline e budget definiti. Perfetto per MVP, feature specifiche o applicazioni complete</p>
            <span class="model-tag">Best for: MVP, New Projects</span>
          </div>
          <div class="model-card">
            <span class="model-icon">⏱️</span>
            <h3>Contratto Orario</h3>
            <p>Pagamento per ore lavorate. Ideale per progetti con requisiti in evoluzione o manutenzione continuativa</p>
            <span class="model-tag">Best for: Maintenance, Support</span>
          </div>
          <div class="model-card">
            <span class="model-icon">🎯</span>
            <h3>Retainer</h3>
            <p>Supporto mensile con ore dedicate. Perfetto per startup e aziende che necessitano supporto continuativo</p>
            <span class="model-tag">Best for: Ongoing Support</span>
          </div>
          <div class="model-card">
            <span class="model-icon">🤝</span>
            <h3>Partnership</h3>
            <p>Collaborazione con agenzie per progetti grossi o divisione di responsabilità tecnica</p>
            <span class="model-tag">Best for: Large Projects</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="careers-cta">
      <div class="container">
        <h2>{{ t('careers.cta_title') }}</h2>
        <p>{{ t('careers.cta_subtitle') }}</p>
        <a routerLink="/contatti" class="btn-primary">
          {{ t('careers.view_offers') }}
          <span class="arrow">→</span>
        </a>
      </div>
    </section>
  `,
  styleUrl: './careers.component.scss'
})
export class CareersComponent implements OnInit, OnDestroy {
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
    this.metaService.setCareersPageMeta();
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
