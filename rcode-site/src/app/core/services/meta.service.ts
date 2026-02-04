import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Service per la gestione dinamica dei metadati SEO
 * Consente di aggiornare title, description, og:tags ecc.
 */
@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly siteUrl = 'https://www.rcode.it';
  private readonly defaultImage = `${this.siteUrl}/assets/og-image.jpg`;

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  /**
   * Imposta i metadati per una pagina
   * @param config - Configurazione dei metadati
   */
  setMetaTags(config: {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
  }): void {
    // Imposta il title
    this.titleService.setTitle(`${config.title} | RCODE`);

    // Imposta la description
    this.updateMetaTag('description', config.description);

    // Imposta keywords se forniti
    if (config.keywords) {
      this.updateMetaTag('keywords', config.keywords);
    }

    // Imposta Open Graph tags
    const url = config.url || this.siteUrl;
    this.updateMetaTag('og:title', config.title);
    this.updateMetaTag('og:description', config.description);
    this.updateMetaTag('og:url', url);
    this.updateMetaTag('og:image', config.image || this.defaultImage);
    this.updateMetaTag('og:type', 'website');

    // Imposta Twitter Card tags
    this.updateMetaTag('twitter:title', config.title);
    this.updateMetaTag('twitter:description', config.description);
    this.updateMetaTag('twitter:image', config.image || this.defaultImage);
    this.updateMetaTag('twitter:card', 'summary_large_image');

    // Canonical URL
    this.updateMetaTag('canonical', url, 'link');
  }

  /**
   * Metadati per homepage
   */
  setHomePageMeta(): void {
    this.setMetaTags({
      title: 'Consulenza Tecnologica e Trasformazione Digitale',
      description: 'Innova Tech Solutions: partner strategico per la trasformazione digitale, cloud computing, AI e cybersecurity.',
      keywords: 'consulenza digitale, trasformazione digitale, cloud, AI, cybersecurity, innovazione tecnologica',
      url: this.siteUrl
    });
  }

  /**
   * Metadati per pagina Chi Siamo
   */
  setAboutPageMeta(): void {
    this.setMetaTags({
      title: 'Chi Siamo | RCODE',
      description: 'Scopri la nostra storia, mission e valori. Innova Tech Solutions è un leader nel settore della consulenza tecnologica.',
      keywords: 'chi siamo, about us, consulenza tecnologica, innova tech',
      url: `${this.siteUrl}/chi-siamo`
    });
  }

  /**
   * Metadati per pagina Servizi
   */
  setServicesPageMeta(): void {
    this.setMetaTags({
      title: 'Servizi di Consulenza | RCODE',
      description: 'Soluzioni complete in trasformazione digitale, cloud, AI, cybersecurity e sviluppo applicazioni.',
      keywords: 'servizi consulenza, cloud computing, AI, cybersecurity, application development',
      url: `${this.siteUrl}/servizi`
    });
  }

  /**
   * Metadati per pagina Industrie
   */
  setIndustriesPageMeta(): void {
    this.setMetaTags({
      title: 'Soluzioni per Industria | RCODE',
      description: 'Soluzioni verticali per Finance, Healthcare, Manufacturing, Pubblica Amministrazione e Retail.',
      keywords: 'soluzioni industria, finance, healthcare, manufacturing, pubblica amministrazione',
      url: `${this.siteUrl}/industrie`
    });
  }

  /**
   * Metadati per pagina Lavora Con Noi
   */
  setCareersPageMeta(): void {
    this.setMetaTags({
      title: 'Lavora Con Noi | RCODE',
      description: 'Unisciti a un team di talenti. Scopri le opportunità di carriera e la nostra cultura aziendale.',
      keywords: 'carriera, lavoro, talenti, culture, innovation, tech jobs',
      url: `${this.siteUrl}/lavora-con-noi`
    });
  }

  /**
   * Metadati per pagina Contatti
   */
  setContactPageMeta(): void {
    this.setMetaTags({
      title: 'Contattaci | RCODE',
      description: 'Contattaci per una consulenza strategica gratuita. Il nostro team è pronto ad ascoltare le tue esigenze.',
      keywords: 'contatti, contact, consulenza gratuita, support',
      url: `${this.siteUrl}/contatti`
    });
  }

  /**
   * Aggiorna un singolo meta tag
   */
  private updateMetaTag(name: string, content: string, type: 'meta' | 'link' = 'meta'): void {
    if (type === 'meta') {
      const property = name.includes(':') ? 'property' : 'name';
      this.metaService.updateTag({ [property]: name, content });
    } else if (type === 'link') {
      // Rimuovi il tag precedente se esiste
      const existingLink = document.querySelector(`link[rel="${name}"]`);
      if (existingLink) {
        existingLink.remove();
      }
      // Aggiungi il nuovo tag
      const link = document.createElement('link');
      link.rel = name;
      link.href = content;
      document.head.appendChild(link);
    }
  }
}
