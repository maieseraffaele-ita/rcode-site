import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CookieBannerComponent } from '../cookie-banner/cookie-banner.component';
import { CookieConsentService } from '../../core/services/cookie-consent.service';

/**
 * Componente Layout principale
 * Contiene Header, Footer, e la zona routing principale
 * Gestisce il banner cookie
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CookieBannerComponent
  ],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <app-footer></app-footer>
      
      <!-- Cookie banner gestito da CookieConsentService -->
      <app-cookie-banner 
        *ngIf="cookieConsentService.cookieConsentShown()"
      ></app-cookie-banner>
    </div>
  `,
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  constructor(public cookieConsentService: CookieConsentService) {}

  ngOnInit(): void {
    // Il layout è inizializzato
    console.log('Layout component loaded');
  }
}
