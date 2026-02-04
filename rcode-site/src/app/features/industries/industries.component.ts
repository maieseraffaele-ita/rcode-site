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
        <h1>Soluzioni per ogni industria</h1>
        <p>Expertise verticale con expertise domain-specific per mission-critical sectors</p>
      </div>
    </section>

    <section class="industries-section">
      <div class="container">
        <div class="industry-item">
          <div class="industry-icon">🏦</div>
          <h2>Finance & Banking</h2>
          <p>Innovazione nel settore finanziario con compliance, security e scalabilità. Dai pagamenti digitali alle piattaforme di trading, supportiamo la trasformazione del settore finanziario.</p>
          <ul>
            <li>Payment Systems & Digital Banking</li>
            <li>Fintech Solutions</li>
            <li>Regulatory Compliance (PSD2, GDPR)</li>
            <li>Fraud Detection & Prevention</li>
          </ul>
        </div>

        <div class="industry-item">
          <div class="industry-icon">🏥</div>
          <h2>Healthcare & Life Sciences</h2>
          <p>Soluzioni sanitarie che mettono il paziente al centro. Telemedicina, EHR e analytics predittive per migliorare l'assistenza.</p>
          <ul>
            <li>Electronic Health Records (EHR)</li>
            <li>Telemedicine Platforms</li>
            <li>Clinical Data Analytics</li>
            <li>HIPAA & Data Privacy Compliance</li>
          </ul>
        </div>

        <div class="industry-item">
          <div class="industry-icon">🏭</div>
          <h2>Manufacturing</h2>
          <p>Industria 4.0, IoT e ottimizzazione della produzione. Trasforma le tue operazioni di fabbrica con automazione intelligente.</p>
          <ul>
            <li>Industry 4.0 Solutions</li>
            <li>IoT & Sensor Integration</li>
            <li>Supply Chain Optimization</li>
            <li>Predictive Maintenance</li>
          </ul>
        </div>

        <div class="industry-item">
          <div class="industry-icon">🏛️</div>
          <h2>Pubblica Amministrazione</h2>
          <p>Digitalizzazione della PA con standard AGID. Servizi digitali per cittadini e imprese, con security e compliance.</p>
          <ul>
            <li>Digital Public Services</li>
            <li>E-government Solutions</li>
            <li>SPID & CIE Integration</li>
            <li>Open Data & Transparency</li>
          </ul>
        </div>

        <div class="industry-item">
          <div class="industry-icon">🛍️</div>
          <h2>Retail & E-commerce</h2>
          <p>Omnichannel e customer experience digitale. Dalla e-commerce al loyalty program, connetti i tuoi clienti.</p>
          <ul>
            <li>E-commerce Platforms</li>
            <li>Omnichannel Strategy</li>
            <li>Customer Analytics & Personalization</li>
            <li>Inventory Management</li>
          </ul>
        </div>

        <div class="industry-item">
          <div class="industry-icon">⚡</div>
          <h2>Energy & Utilities</h2>
          <p>Digitalizzazione del settore energetico. Smart grids, IoT e analytics per efficienza energetica.</p>
          <ul>
            <li>Smart Grid Solutions</li>
            <li>Energy Analytics</li>
            <li>Asset Management</li>
            <li>Renewable Energy Optimization</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="industries-cta">
      <div class="container">
        <h2>Non trovi il tuo settore?</h2>
        <p>Contiamo su esperienza cross-sector per portare innovazione a qualsiasi industria</p>
        <a routerLink="/contatti" class="btn-primary">
          Parliamo del tuo settore
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
