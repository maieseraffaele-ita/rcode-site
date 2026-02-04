import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { TranslationService } from '../../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Componente Chi Siamo (About)
 * Presentation della storia, mission, vision e valori dell'azienda
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <h1>Chi Siamo</h1>
        <p>Leader nella consulenza strategica e trasformazione digitale dal 2009</p>
      </div>
    </section>

    <!-- Company Story -->
    <section class="company-story">
      <div class="container">
        <div class="story-grid">
          <div class="story-text">
            <h2>La nostra storia</h2>
            <p>
              RCODE nasce nel 2009 da una visione semplice ma potente:
              trasformare il modo in cui le aziende utilizzano la tecnologia per crescere.
            </p>
            <p>
              In questi 15 anni, abbiamo accompagnato centinaia di aziende nel loro percorso 
              di innovazione digitale, passando dalle prime implementazioni cloud alle 
              soluzioni più complesse di AI e intelligenza artificiale.
            </p>
            <p>
              Oggi, siamo un team di oltre 150 esperti distribuiti in 5 paesi, 
              con un track record di 500+ progetti completati con successo.
            </p>
          </div>
          <div class="story-visual">
            <div class="timeline">
              <div class="timeline-item">
                <span class="year">2009</span>
                <span class="event">Fondazione di RCODE</span>
              </div>
              <div class="timeline-item">
                <span class="year">2012</span>
                <span class="event">Apertura ufficio Europa</span>
              </div>
              <div class="timeline-item">
                <span class="year">2015</span>
                <span class="event">Specializzazione in Cloud Computing</span>
              </div>
              <div class="timeline-item">
                <span class="year">2018</span>
                <span class="event">Lancio Practice in AI & Machine Learning</span>
              </div>
              <div class="timeline-item">
                <span class="year">2021</span>
                <span class="event">Certificazione ISO 27001</span>
              </div>
              <div class="timeline-item">
                <span class="year">2024</span>
                <span class="event">Centro di Eccellenza in AI & Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values -->
    <section class="mvv">
      <div class="container">
        <div class="mvv-grid">
          <div class="mvv-card primary">
            <h3>Mission</h3>
            <p>
              Accelerare la trasformazione digitale delle aziende fornendo 
              expertise tecnologica, strategie innovative e soluzioni che generano 
              valore misurabile.
            </p>
          </div>
          <div class="mvv-card">
            <h3>Vision</h3>
            <p>
              Un mondo dove la tecnologia è un abilitatore di crescita 
              e innovazione per ogni azienda, indipendentemente dalla sua dimensione.
            </p>
          </div>
          <div class="mvv-card">
            <h3>Valori</h3>
            <ul>
              <li><strong>Eccellenza:</strong> Perseguiamo i massimi standard di qualità</li>
              <li><strong>Integrità:</strong> Agire con trasparenza e etica</li>
              <li><strong>Innovazione:</strong> Rimanere all'avanguardia tecnologica</li>
              <li><strong>Partnership:</strong> Crescere insieme ai nostri clienti</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Team & Culture -->
    <section class="team-culture">
      <div class="container">
        <h2>Il nostro team</h2>
        <p class="section-subtitle">Persone talentuose con passion per l'innovazione</p>
        
        <div class="culture-grid">
          <div class="culture-item">
            <div class="icon">🎓</div>
            <h3>Formazione Continua</h3>
            <p>Investiamo nella crescita professionale del nostro team con programmi di training dedicati.</p>
          </div>
          <div class="culture-item">
            <div class="icon">🌍</div>
            <h3>Inclusione e Diversità</h3>
            <p>Un ambiente dove ogni talento può esprimere al meglio il proprio potenziale.</p>
          </div>
          <div class="culture-item">
            <div class="icon">⚙️</div>
            <h3>Approccio Agile</h3>
            <p>Metodologie moderne e flessibili che permettono innovazione rapida.</p>
          </div>
          <div class="culture-item">
            <div class="icon">🚀</div>
            <h3>Impatto Sociale</h3>
            <p>Contribuiamo alla comunità attraverso progetti di responsabilità sociale.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications & Partnerships -->
    <section class="certifications">
      <div class="container">
        <h2>Certificazioni e Partnership</h2>
        <p class="section-subtitle">Riconoscimenti che attestano la nostra eccellenza</p>
        
        <div class="certs-grid">
          <div class="cert-item">
            <span class="cert-badge">ISO 27001</span>
            <p>Gestione della Sicurezza dell'Informazione</p>
          </div>
          <div class="cert-item">
            <span class="cert-badge">AWS Partner</span>
            <p>Advanced Technology Partner</p>
          </div>
          <div class="cert-item">
            <span class="cert-badge">Microsoft Gold</span>
            <p>Certified Partner</p>
          </div>
          <div class="cert-item">
            <span class="cert-badge">Google Cloud</span>
            <p>Select Partner</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="about-cta">
      <div class="container">
        <h2>Vuoi far parte del nostro team?</h2>
        <p>Scopri le opportunità di carriera presso Innova Tech Solutions</p>
        <a routerLink="/lavora-con-noi" class="btn-primary">
          Vedi le nostre offerte
          <span class="arrow">→</span>
        </a>
      </div>
    </section>
  `,
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.setAboutPageMeta();
  }
}
