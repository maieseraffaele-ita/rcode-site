import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideMeta, provideTitle } from '@angular/platform-browser';

import { routes } from './app.routes';

/**
 * Configurazione principale dell'applicazione Angular
 * Providers per routing, meta tags, title service e altro
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Error listeners globali
    provideBrowserGlobalErrorListeners(),
    
    // Router con scroll smoothing
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),
    
    // Meta tags provider per SEO
    provideMeta(),
    
    // Title provider per SEO
    provideTitle()
  ]
};
