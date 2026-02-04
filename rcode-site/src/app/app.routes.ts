import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

/**
 * Routing principale dell'applicazione
 * Utilizza feature-based architecture con lazy loading dei moduli
 */
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Homepage (eager loaded per performance)
      {
        path: '',
        loadComponent: () => import('./features/homepage/homepage.component').then(m => m.HomepageComponent),
        data: { title: 'Home' }
      },
      
      // Chi Siamo (lazy loaded)
      {
        path: 'chi-siamo',
        loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
        data: { title: 'Chi Siamo' }
      },

      // Servizi (lazy loaded)
      {
        path: 'servizi',
        loadComponent: () => import('./features/services/services.component').then(m => m.ServicesComponent),
        data: { title: 'Servizi' }
      },

      // Industrie (lazy loaded)
      {
        path: 'industrie',
        loadComponent: () => import('./features/industries/industries.component').then(m => m.IndustriesComponent),
        data: { title: 'Industrie' }
      },

      // Lavora Con Noi (lazy loaded)
      {
        path: 'lavora-con-noi',
        loadComponent: () => import('./features/careers/careers.component').then(m => m.CareersComponent),
        data: { title: 'Lavora Con Noi' }
      },

      // Contatti (lazy loaded)
      {
        path: 'contatti',
        loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
        data: { title: 'Contatti' }
      },

      // Privacy Policy (lazy loaded)
      {
        path: 'privacy-policy',
        loadComponent: () => import('./features/legal/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
        data: { title: 'Privacy Policy' }
      },

      // Cookie Policy (lazy loaded)
      {
        path: 'cookie-policy',
        loadComponent: () => import('./features/legal/cookie-policy.component').then(m => m.CookiePolicyComponent),
        data: { title: 'Cookie Policy' }
      }
    ]
  },

  // Wildcard route per 404
  {
    path: '**',
    redirectTo: '/'
  }
];
