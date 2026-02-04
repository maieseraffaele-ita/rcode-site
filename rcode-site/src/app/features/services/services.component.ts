import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MetaService } from '../../core/services/meta.service';
import { TranslationService } from '../../core/services/translation.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Componente Services
 * Dettaglio di tutti i servizi offerti
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
        <h1>I nostri servizi</h1>
        <p>Soluzioni complete per la trasformazione digitale del tuo business</p>
      </div>
    </section>

    <!-- Services Detailed Section -->
    <section class="services-detailed">
      <div class="container">
        <!-- Digital Transformation -->
        <div class="service-detail" id="digital-transformation">
          <div class="service-header">
            <span class="service-icon">🔄</span>
            <h2>Trasformazione Digitale</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                La trasformazione digitale non è una scelta ma una necessità. 
                Ti guidiamo attraverso un percorso strategico che ripensa processi, 
                organizzazione e cultura aziendale.
              </p>
              <h3>Cosa offriamo:</h3>
              <ul>
                <li>Digital Strategy & Roadmap</li>
                <li>Process Digitalization</li>
                <li>Change Management</li>
                <li>Digital Culture Training</li>
                <li>Business Model Innovation</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Benefici:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">⚡</span>
                  <span>Efficienza operativa +40%</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">📈</span>
                  <span>Accelerazione time-to-market</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">💰</span>
                  <span>Riduzione costi operativi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cloud & Infrastructure -->
        <div class="service-detail" id="cloud">
          <div class="service-header">
            <span class="service-icon">☁️</span>
            <h2>Cloud & Infrastructure</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                Sfrutta la scalabilità, flessibilità e riduzione dei costi del cloud computing. 
                Dalla migrazione alla gestione, ti supportiamo in ogni fase.
              </p>
              <h3>Cosa offriamo:</h3>
              <ul>
                <li>Cloud Architecture & Design</li>
                <li>Cloud Migration (Lift & Shift, Replatform)</li>
                <li>Multi-cloud Strategy</li>
                <li>Infrastructure as Code (IaC)</li>
                <li>Cloud Cost Optimization</li>
                <li>Managed Services</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Benefici:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">🚀</span>
                  <span>Scalabilità infinita</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">💰</span>
                  <span>Riduzione CAPEX 60%</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">🌍</span>
                  <span>Disponibilità globale</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI & Data -->
        <div class="service-detail" id="ai">
          <div class="service-header">
            <span class="service-icon">🤖</span>
            <h2>Artificial Intelligence & Data</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                I tuoi dati sono un asset strategico. Estrai valore con machine learning, 
                analytics predittive e automazione intelligente.
              </p>
              <h3>Cosa offriamo:</h3>
              <ul>
                <li>Machine Learning Solutions</li>
                <li>Predictive Analytics</li>
                <li>Natural Language Processing (NLP)</li>
                <li>Computer Vision</li>
                <li>Data Engineering & Pipelines</li>
                <li>Data Governance</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Benefici:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">🎯</span>
                  <span>Decisioni data-driven</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">⚙️</span>
                  <span>Automazione processi</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">📊</span>
                  <span>Insights predittivi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cybersecurity -->
        <div class="service-detail" id="cybersecurity">
          <div class="service-header">
            <span class="service-icon">🔒</span>
            <h2>Cybersecurity</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                La sicurezza è fondamentale. Proteggiamo i tuoi asset digitali 
                con strategie comprehensive di threat prevention e compliance.
              </p>
              <h3>Cosa offriamo:</h3>
              <ul>
                <li>Security Assessments</li>
                <li>Vulnerability Management</li>
                <li>Incident Response</li>
                <li>Compliance & Audit (GDPR, ISO 27001)</li>
                <li>Security Operations Center (SOC)</li>
                <li>Penetration Testing</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Benefici:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">🛡️</span>
                  <span>Protezione 24/7</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">✅</span>
                  <span>Compliance garantito</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">🚨</span>
                  <span>Response tempestiva</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Development -->
        <div class="service-detail" id="development">
          <div class="service-header">
            <span class="service-icon">💻</span>
            <h2>Application Development</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                Software custom che risolve le tue sfide di business. 
                Dall'ideazione al deployment, con metodologie agile.
              </p>
              <h3>Cosa offriamo:</h3>
              <ul>
                <li>Web Application Development</li>
                <li>Mobile App Development</li>
                <li>API & Microservices</li>
                <li>Legacy System Modernization</li>
                <li>DevOps & CI/CD</li>
                <li>Quality Assurance & Testing</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Benefici:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">⚡</span>
                  <span>Time-to-market rapido</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">🔄</span>
                  <span>Scalabilità garantita</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">🎨</span>
                  <span>UX/UI ottimale</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Consulting & Strategy -->
        <div class="service-detail" id="consulting">
          <div class="service-header">
            <span class="service-icon">📊</span>
            <h2>Consulting & Strategy</h2>
          </div>
          <div class="service-content">
            <div class="service-text">
              <p>
                Allinea IT e business. Sviluppiamo strategie technology che 
                accelerano la crescita e creano competitive advantage.
              </p>
              <h3>Cosa offriamo:</h3>
              <ul>
                <li>IT Strategy & Planning</li>
                <li>Enterprise Architecture</li>
                <li>Technology Assessment</li>
                <li>Cost Optimization</li>
                <li>Vendor Management</li>
                <li>Digital Maturity Assessment</li>
              </ul>
            </div>
            <div class="service-benefits">
              <h3>Benefici:</h3>
              <div class="benefit-list">
                <div class="benefit">
                  <span class="benefit-icon">🎯</span>
                  <span>Roadmap chiara</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">💡</span>
                  <span>Innovazione strategica</span>
                </div>
                <div class="benefit">
                  <span class="benefit-icon">📈</span>
                  <span>ROI massimizzato</span>
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
        <h2>Modelli di Engagement</h2>
        <p class="section-subtitle">Flessibilità nel come lavoriamo insieme</p>
        
        <div class="models-grid">
          <div class="model-card">
            <h3>Project Based</h3>
            <p>Scope definito e tempistica chiara per progetti specifici.</p>
          </div>
          <div class="model-card">
            <h3>Time & Materials</h3>
            <p>Flessibilità per progetti con requisiti in evoluzione.</p>
          </div>
          <div class="model-card">
            <h3>Managed Services</h3>
            <p>Supporto continuativo e manutenzione delle tue soluzioni.</p>
          </div>
          <div class="model-card">
            <h3>Staff Augmentation</h3>
            <p>Estendi il tuo team con i nostri esperti certificati.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="services-cta">
      <div class="container">
        <h2>Pronto ad iniziare?</h2>
        <p>Contattaci per una consulenza gratuita sui tuoi bisogni specifici</p>
        <a routerLink="/contatti" class="btn-primary">
          Richiedi una consulenza
          <span class="arrow">→</span>
        </a>
      </div>
    </section>
  `,
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.setServicesPageMeta();
  }
}
