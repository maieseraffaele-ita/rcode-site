import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="careers-hero">
      <div class="container">
        <h1>Lavora con noi</h1>
        <p>Costruiamo il futuro della tecnologia con talenti straordinari</p>
      </div>
    </section>

    <section class="culture-section">
      <div class="container">
        <h2>La nostra cultura</h2>
        <div class="culture-grid">
          <div class="culture-card">
            <span class="icon">🚀</span>
            <h3>Innovazione</h3>
            <p>Lavora con le tecnologie più moderne e creativi nel tuo campo</p>
          </div>
          <div class="culture-card">
            <span class="icon">🎓</span>
            <h3>Apprendimento Continuo</h3>
            <p>Certificazioni, corsi e mentorship per la tua crescita professionale</p>
          </div>
          <div class="culture-card">
            <span class="icon">🌍</span>
            <h3>Globalità</h3>
            <p>Collabora con team internazionali e clienti in tutto il mondo</p>
          </div>
          <div class="culture-card">
            <span class="icon">⚖️</span>
            <h3>Work-Life Balance</h3>
            <p>Flessibilità, smart working e benefit competitivi</p>
          </div>
        </div>
      </div>
    </section>

    <section class="positions-section">
      <div class="container">
        <h2>Posizioni Aperte</h2>
        <p class="section-subtitle">Scopri le opportunità di carriera</p>
        
        <div class="positions-grid">
          <div class="position-card">
            <h3>Senior Full Stack Developer</h3>
            <p>Cerchiamo uno sviluppatore esperto in Angular, Node.js e cloud architecture.</p>
            <div class="position-meta">
              <span class="location">📍 Milano</span>
              <span class="type">Tempo pieno</span>
            </div>
            <a href="#" class="btn-secondary">Candidati</a>
          </div>

          <div class="position-card">
            <h3>Cloud Solutions Architect</h3>
            <p>Progetta soluzioni cloud enterprise per clienti Fortune 500.</p>
            <div class="position-meta">
              <span class="location">📍 Roma</span>
              <span class="type">Tempo pieno</span>
            </div>
            <a href="#" class="btn-secondary">Candidati</a>
          </div>

          <div class="position-card">
            <h3>Data Engineer</h3>
            <p>Costruisci pipeline dati scalabili e analytics infrastructure.</p>
            <div class="position-meta">
              <span class="location">📍 Milano / Remote</span>
              <span class="type">Tempo pieno</span>
            </div>
            <a href="#" class="btn-secondary">Candidati</a>
          </div>

          <div class="position-card">
            <h3>Security Engineer</h3>
            <p>Proteggi le infrastrutture critiche dei nostri clienti enterprise.</p>
            <div class="position-meta">
              <span class="location">📍 Roma / Remote</span>
              <span class="type">Tempo pieno</span>
            </div>
            <a href="#" class="btn-secondary">Candidati</a>
          </div>

          <div class="position-card">
            <h3>Business Analyst</h3>
            <p>Trasforma i requisiti dei clienti in soluzioni tecnologiche innovative.</p>
            <div class="position-meta">
              <span class="location">📍 Milano</span>
              <span class="type">Tempo pieno</span>
            </div>
            <a href="#" class="btn-secondary">Candidati</a>
          </div>

          <div class="position-card">
            <h3>Project Manager</h3>
            <p>Guida progetti complessi e gestisci team internazionali.</p>
            <div class="position-meta">
              <span class="location">📍 Roma / Remote</span>
              <span class="type">Tempo pieno</span>
            </div>
            <a href="#" class="btn-secondary">Candidati</a>
          </div>
        </div>
      </div>
    </section>

    <section class="benefits-section">
      <div class="container">
        <h2>Cosa offriamo</h2>
        <div class="benefits-grid">
          <div class="benefit">
            <span class="benefit-icon">💰</span>
            <h3>Compenso Competitivo</h3>
            <p>Stipendio fisso + bonus performance + stock options</p>
          </div>
          <div class="benefit">
            <span class="benefit-icon">🏥</span>
            <h3>Health Insurance</h3>
            <p>Copertura sanitaria completa per te e la tua famiglia</p>
          </div>
          <div class="benefit">
            <span class="benefit-icon">🎓</span>
            <h3>Training Budget</h3>
            <p>€2,000+ annui per certificazioni e corsi</p>
          </div>
          <div class="benefit">
            <span class="benefit-icon">🏠</span>
            <h3>Smart Working</h3>
            <p>Lavora da casa fino a 3 giorni a settimana</p>
          </div>
          <div class="benefit">
            <span class="benefit-icon">🎯</span>
            <h3>Mentorship</h3>
            <p>Mentor dedicato per il tuo sviluppo professionale</p>
          </div>
          <div class="benefit">
            <span class="benefit-icon">🎉</span>
            <h3>Team Events</h3>
            <p>Evento aziendale annuale + team building</p>
          </div>
        </div>
      </div>
    </section>

    <section class="careers-cta">
      <div class="container">
        <h2>Non hai trovato la posizione giusta?</h2>
        <p>Inviaci il tuo CV per opportunità future</p>
        <a routerLink="/contatti" class="btn-primary">
          Contattaci
          <span class="arrow">→</span>
        </a>
      </div>
    </section>
  `,
  styleUrl: './careers.component.scss'
})
export class CareersComponent implements OnInit {
  constructor(private metaService: MetaService) {}
  
  ngOnInit(): void {
    this.metaService.setCareersPageMeta();
  }
}
