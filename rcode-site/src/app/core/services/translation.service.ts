import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'it' | 'en' | 'de';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

/**
 * Servizio di traduzione per gestire il multi-linguaggio
 * Supporta: Italiano, Inglese, Tedesco
 * Usa Observable per far sì che i componenti reagiscono al cambio di lingua
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Signal per la lingua corrente
  currentLanguage = signal<Language>('it');
  
  // Subject che emette quando la lingua cambia - utilizzato dai componenti per reagire
  private languageChange$ = new BehaviorSubject<Language>('it');
  
  // Storage key per localStorage
  private readonly CONSENT_KEY = 'language';

  private translations: Translations = {
    it: {
      // Header & Navigation
      'nav.home': 'Home',
      'nav.about': 'Chi Siamo',
      'nav.services': 'Servizi',
      'nav.industries': 'Industrie',
      'nav.careers': 'Carriera',
      'nav.contact': 'Contatti',
      'nav.request_consultation': 'Richiedi Consulenza',
      'nav.join_team': 'Unisciti al team',
      
      // Homepage
      'home.hero_title': 'Trasforma il tuo business',
      'home.hero_title_gradient': 'con la giusta tecnologia',
      'home.hero_subtitle': 'Partner strategico per la trasformazione digitale. Combiniamo competenza tecnologica, innovazione e risultati misurabili per accelerare la crescita della tua azienda.',
      'home.hero_cta_primary': 'Richiedi una consulenza gratuita',
      'home.hero_cta_secondary': 'Scopri di più su di noi',
      'home.hero_stat_1': '500+',
      'home.hero_stat_1_label': 'Progetti completati',
      'home.hero_stat_2': '15+',
      'home.hero_stat_2_label': 'Anni di esperienza',
      'home.hero_stat_3': '98%',
      'home.hero_stat_3_label': 'Client satisfaction',
      
      // Value Proposition
      'home.vp_title': 'Perché scegliere RCODE?',
      'home.vp_subtitle': 'Tre pilastri che guidano il nostro approccio strategico',
      'home.vp_card_1_title': 'Risultati Misurabili',
      'home.vp_card_1_text': 'Ogni progetto è strutturato con KPI chiari e ROI tracciabile. Non proponiamo solo soluzioni: proponiamo crescita quantificabile.',
      'home.vp_card_2_title': 'Competenza Tecnica',
      'home.vp_card_2_text': 'Team di esperti certificati con expertise in cloud, AI, cybersecurity e sviluppo applicazioni enterprise.',
      'home.vp_card_3_title': 'Innovazione Continua',
      'home.vp_card_3_text': 'Rimaniamo sempre ai vertici delle nuove tecnologie. La trasformazione digitale non è una destinazione, è un percorso.',
      
      // Services Overview
      'home.services_title': 'I nostri servizi principali',
      'home.services_subtitle': 'Soluzioni complete per la trasformazione digitale del tuo business',
      'home.services_cta': 'Esplora tutti i servizi',
      
      'service.digital_transformation': 'Trasformazione Digitale',
      'service.digital_transformation_desc': 'Ripensa i tuoi processi con tecnologie moderne. Dalla strategia all\'implementazione, ti guidiamo in ogni fase.',
      'service.cloud': 'Cloud & Infrastructure',
      'service.cloud_desc': 'Sfrutta la scalabilità del cloud. Migrazione, architettura e ottimizzazione dei costi.',
      'service.ai': 'Artificial Intelligence & Data',
      'service.ai_desc': 'Estrai valore dai tuoi dati con intelligenza artificiale. Machine Learning e analytics predittive.',
      'service.cybersecurity': 'Cybersecurity',
      'service.cybersecurity_desc': 'Proteggi i tuoi asset digitali. Compliance, vulnerability assessment e threat protection.',
      'service.development': 'Application Development',
      'service.development_desc': 'Soluzioni software custom per le tue esigenze. Web, mobile e API enterprise-ready.',
      'service.consulting': 'Consulting & Strategy',
      'service.consulting_desc': 'Allineamento tra IT e business. Roadmap tecnologico per accelerare la tua crescita.',
      'service.learn_more': 'Scopri di più →',
      
      // Industries
      'home.industries_title': 'Soluzioni per ogni industria',
      'home.industries_subtitle': 'Expertise verticale in settori mission-critical',
      'home.industries_cta': 'Scopri le soluzioni per industria',
      
      // Final CTA
      'home.final_cta_title': 'Pronto a trasformare il tuo business?',
      'home.final_cta_subtitle': 'Contattaci oggi per una consulenza strategica gratuita. Scopri come possiamo accelerare la tua trasformazione digitale.',
      'home.final_cta_button': 'Richiedi una consulenza',
      
      // About Page
      'about.hero_title': 'Chi Siamo',
      'about.hero_subtitle': 'Leader nella consulenza strategica e trasformazione digitale dal 2009',
      'about.story_title': 'La nostra storia',
      'about.mission_title': 'Mission',
      'about.vision_title': 'Vision',
      'about.values_title': 'Valori',
      'about.team_title': 'Il nostro team',
      'about.team_subtitle': 'Persone talentuose con passion per l\'innovazione',
      'about.certifications_title': 'Certificazioni e Partnership',
      
      // Services Page
      'services.hero_title': 'I nostri servizi',
      'services.hero_subtitle': 'Soluzioni complete per la trasformazione digitale del tuo business',
      
      // Industries Page
      'industries.hero_title': 'Soluzioni per ogni industria',
      'industries.hero_subtitle': 'Expertise verticale con expertise domain-specific per mission-critical sectors',
      'industries.cta_title': 'Non trovi il tuo settore?',
      'industries.cta_subtitle': 'Contiamo su esperienza cross-sector per portare innovazione a qualsiasi industria',
      
      // Careers Page
      'careers.hero_title': 'Lavora con noi',
      'careers.hero_subtitle': 'Costruiamo il futuro della tecnologia con talenti straordinari',
      'careers.culture_title': 'La nostra cultura',
      'careers.positions_title': 'Posizioni Aperte',
      'careers.benefits_title': 'Cosa offriamo',
      'careers.cta_title': 'Non hai trovato la posizione giusta?',
      'careers.cta_subtitle': 'Inviaci il tuo CV per opportunità future',
      'careers.view_offers': 'Vedi le nostre offerte',
      'careers.join_us': 'Unisciti a RCODE',
      
      // Contact Page
      'contact.hero_title': 'Contattaci',
      'contact.hero_subtitle': 'Parliamo della tua trasformazione digitale',
      'contact.form_title': 'Inviaci un messaggio',
      'contact.form_name': 'Nome completo',
      'contact.form_email': 'Email',
      'contact.form_company': 'Azienda',
      'contact.form_service': 'Servizio di interesse',
      'contact.form_service_select': 'Seleziona un servizio',
      'contact.form_service_other': 'Altro',
      'contact.form_message': 'Messaggio',
      'contact.form_message_placeholder': 'Descrivi brevemente il tuo progetto e le tue esigenze...',
      'contact.form_gdpr': 'Ho letto e accetto la',
      'contact.form_submit': 'Invia Messaggio',
      'contact.form_submitting': 'Invio in corso...',
      'contact.form_success': '✓ Messaggio inviato con successo! Ti contatteremo presto.',
      'contact.form_validation_error': 'Per favore completa tutti i campi obbligatori',
      'contact.headquarters': 'Sede Principale',
      'contact.office_rome': 'Ufficio Roma',
      'contact.email': 'Email',
      'contact.email_general': 'Info generali',
      'contact.email_sales': 'Vendite',
      'contact.email_support': 'Supporto',
      'contact.social': 'Social Media',
      'contact.office_hours': 'Orari di ufficio',
      'contact.office_hours_weekday': 'Lunedì - Venerdì: 9:00 - 18:00',
      'contact.office_hours_weekend': 'Sabato - Domenica: Chiuso',
      'contact.office_hours_response': 'Risponderemo a tutte le richieste entro 24 ore lavorative',
      'contact.location_finder': 'Trovaci',
      'contact.location_map_description': 'Mappa interattiva con le nostre sedi',
      
      // Footer
      'footer.company_description': 'Partner strategico per la trasformazione digitale delle tue aziende. Innovazione, affidabilità e risultati misurabili.',
      'footer.services': 'Servizi',
      'footer.company': 'Azienda',
      'footer.legal': 'Legal',
      'footer.privacy': 'Privacy Policy',
      'footer.cookies': 'Cookie Policy',
      'footer.copyright': 'Tutti i diritti riservati.',
      'footer.gdpr': 'GDPR Compliant',
      'footer.iso': 'ISO 27001',
      'footer.enterprise': 'Enterprise Ready',
      
      // Language selector
      'language.italian': 'Italiano',
      'language.english': 'English',
      'language.german': 'Deutsch',
    },
    
    en: {
      // Header & Navigation
      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.services': 'Services',
      'nav.industries': 'Industries',
      'nav.careers': 'Careers',
      'nav.contact': 'Contact',
      'nav.request_consultation': 'Request Consultation',
      'nav.join_team': 'Join the Team',
      
      // Homepage
      'home.hero_title': 'Transform your business',
      'home.hero_title_gradient': 'with the right technology',
      'home.hero_subtitle': 'Strategic partner for digital transformation. We combine technical expertise, innovation and measurable results to accelerate your company\'s growth.',
      'home.hero_cta_primary': 'Request a free consultation',
      'home.hero_cta_secondary': 'Learn more about us',
      'home.hero_stat_1': '500+',
      'home.hero_stat_1_label': 'Projects completed',
      'home.hero_stat_2': '15+',
      'home.hero_stat_2_label': 'Years of experience',
      'home.hero_stat_3': '98%',
      'home.hero_stat_3_label': 'Client satisfaction',
      
      // Value Proposition
      'home.vp_title': 'Why choose RCODE?',
      'home.vp_subtitle': 'Three pillars that guide our strategic approach',
      'home.vp_card_1_title': 'Measurable Results',
      'home.vp_card_1_text': 'Every project is structured with clear KPIs and traceable ROI. We don\'t just offer solutions: we offer quantifiable growth.',
      'home.vp_card_2_title': 'Technical Expertise',
      'home.vp_card_2_text': 'Team of certified experts with expertise in cloud, AI, cybersecurity and enterprise application development.',
      'home.vp_card_3_title': 'Continuous Innovation',
      'home.vp_card_3_text': 'We always stay at the forefront of new technologies. Digital transformation is not a destination, it\'s a journey.',
      
      // Services Overview
      'home.services_title': 'Our main services',
      'home.services_subtitle': 'Complete solutions for your digital transformation',
      'home.services_cta': 'Explore all services',
      
      'service.digital_transformation': 'Digital Transformation',
      'service.digital_transformation_desc': 'Rethink your processes with modern technologies. From strategy to implementation, we guide you at every stage.',
      'service.cloud': 'Cloud & Infrastructure',
      'service.cloud_desc': 'Leverage cloud scalability. Migration, architecture and cost optimization.',
      'service.ai': 'Artificial Intelligence & Data',
      'service.ai_desc': 'Extract value from your data with artificial intelligence. Machine Learning and predictive analytics.',
      'service.cybersecurity': 'Cybersecurity',
      'service.cybersecurity_desc': 'Protect your digital assets. Compliance, vulnerability assessment and threat protection.',
      'service.development': 'Application Development',
      'service.development_desc': 'Custom software solutions for your needs. Web, mobile and enterprise-ready APIs.',
      'service.consulting': 'Consulting & Strategy',
      'service.consulting_desc': 'IT and business alignment. Technology roadmap to accelerate your growth.',
      'service.learn_more': 'Learn more →',
      
      // Industries
      'home.industries_title': 'Solutions for every industry',
      'home.industries_subtitle': 'Vertical expertise in mission-critical sectors',
      'home.industries_cta': 'Discover industry solutions',
      
      // Final CTA
      'home.final_cta_title': 'Ready to transform your business?',
      'home.final_cta_subtitle': 'Contact us today for a free strategic consultation. Discover how we can accelerate your digital transformation.',
      'home.final_cta_button': 'Request a consultation',
      
      // About Page
      'about.hero_title': 'About Us',
      'about.hero_subtitle': 'Leader in strategic consulting and digital transformation since 2009',
      'about.story_title': 'Our story',
      'about.mission_title': 'Mission',
      'about.vision_title': 'Vision',
      'about.values_title': 'Values',
      'about.team_title': 'Our team',
      'about.team_subtitle': 'Talented people with passion for innovation',
      'about.certifications_title': 'Certifications and Partnerships',
      
      // Services Page
      'services.hero_title': 'Our services',
      'services.hero_subtitle': 'Complete solutions for your digital transformation',
      
      // Industries Page
      'industries.hero_title': 'Solutions for every industry',
      'industries.hero_subtitle': 'Vertical expertise with domain-specific expertise for mission-critical sectors',
      'industries.cta_title': 'Can\'t find your sector?',
      'industries.cta_subtitle': 'We rely on cross-sector experience to bring innovation to any industry',
      
      // Careers Page
      'careers.hero_title': 'Work with us',
      'careers.hero_subtitle': 'Building the future of technology with extraordinary talent',
      'careers.culture_title': 'Our culture',
      'careers.positions_title': 'Open Positions',
      'careers.benefits_title': 'What we offer',
      'careers.cta_title': 'Haven\'t found the right position?',
      'careers.cta_subtitle': 'Send us your CV for future opportunities',
      'careers.view_offers': 'View our offers',
      'careers.join_us': 'Join RCODE',
      
      // Contact Page
      'contact.hero_title': 'Contact Us',
      'contact.hero_subtitle': 'Let\'s talk about your digital transformation',
      'contact.form_title': 'Send us a message',
      'contact.form_name': 'Full name',
      'contact.form_email': 'Email',
      'contact.form_company': 'Company',
      'contact.form_service': 'Service of interest',
      'contact.form_service_select': 'Select a service',
      'contact.form_service_other': 'Other',
      'contact.form_message': 'Message',
      'contact.form_message_placeholder': 'Briefly describe your project and needs...',
      'contact.form_gdpr': 'I have read and accept the',
      'contact.form_submit': 'Send Message',
      'contact.form_submitting': 'Sending...',
      'contact.form_success': '✓ Message sent successfully! We will contact you soon.',
      'contact.form_validation_error': 'Please complete all required fields',
      'contact.headquarters': 'Headquarters',
      'contact.office_rome': 'Rome Office',
      'contact.email': 'Email',
      'contact.email_general': 'General info',
      'contact.email_sales': 'Sales',
      'contact.email_support': 'Support',
      'contact.social': 'Social Media',
      'contact.office_hours': 'Office hours',
      'contact.office_hours_weekday': 'Monday - Friday: 9:00 - 18:00',
      'contact.office_hours_weekend': 'Saturday - Sunday: Closed',
      'contact.office_hours_response': 'We will respond to all requests within 24 business hours',
      'contact.location_finder': 'Find us',
      'contact.location_map_description': 'Interactive map with our locations',
      
      // Footer
      'footer.company_description': 'Strategic partner for digital transformation of your companies. Innovation, reliability and measurable results.',
      'footer.services': 'Services',
      'footer.company': 'Company',
      'footer.legal': 'Legal',
      'footer.privacy': 'Privacy Policy',
      'footer.cookies': 'Cookie Policy',
      'footer.copyright': 'All rights reserved.',
      'footer.gdpr': 'GDPR Compliant',
      'footer.iso': 'ISO 27001',
      'footer.enterprise': 'Enterprise Ready',
      
      // Language selector
      'language.italian': 'Italian',
      'language.english': 'English',
      'language.german': 'German',
    },
    
    de: {
      // Header & Navigation
      'nav.home': 'Startseite',
      'nav.about': 'Über uns',
      'nav.services': 'Dienstleistungen',
      'nav.industries': 'Industrien',
      'nav.careers': 'Karriere',
      'nav.contact': 'Kontakt',
      'nav.request_consultation': 'Beratung anfordern',
      'nav.join_team': 'Team beitreten',
      
      // Homepage
      'home.hero_title': 'Transformieren Sie Ihr Geschäft',
      'home.hero_title_gradient': 'mit der richtigen Technologie',
      'home.hero_subtitle': 'Strategischer Partner für digitale Transformation. Wir kombinieren technisches Fachwissen, Innovation und messbare Ergebnisse, um das Wachstum Ihres Unternehmens zu beschleunigen.',
      'home.hero_cta_primary': 'Kostenlose Beratung anfordern',
      'home.hero_cta_secondary': 'Mehr über uns erfahren',
      'home.hero_stat_1': '500+',
      'home.hero_stat_1_label': 'Abgeschlossene Projekte',
      'home.hero_stat_2': '15+',
      'home.hero_stat_2_label': 'Jahre Erfahrung',
      'home.hero_stat_3': '98%',
      'home.hero_stat_3_label': 'Kundenzufriedenheit',
      
      // Value Proposition
      'home.vp_title': 'Warum RCODE wählen?',
      'home.vp_subtitle': 'Drei Säulen, die unseren strategischen Ansatz leiten',
      'home.vp_card_1_title': 'Messbare Ergebnisse',
      'home.vp_card_1_text': 'Jedes Projekt ist mit klaren KPIs und nachverfolgbarem ROI strukturiert. Wir bieten nicht nur Lösungen: wir bieten quantifizierbares Wachstum.',
      'home.vp_card_2_title': 'Technische Kompetenz',
      'home.vp_card_2_text': 'Team von zertifizierten Experten mit Fachwissen in Cloud, KI, Cybersicherheit und Enterprise-Anwendungsentwicklung.',
      'home.vp_card_3_title': 'Kontinuierliche Innovation',
      'home.vp_card_3_text': 'Wir bleiben immer an der Spitze neuer Technologien. Digitale Transformation ist nicht das Ziel, sondern eine Reise.',
      
      // Services Overview
      'home.services_title': 'Unsere wichtigsten Dienstleistungen',
      'home.services_subtitle': 'Umfassende Lösungen für Ihre digitale Transformation',
      'home.services_cta': 'Alle Dienstleistungen erkunden',
      
      'service.digital_transformation': 'Digitale Transformation',
      'service.digital_transformation_desc': 'Überdenken Sie Ihre Prozesse mit modernen Technologien. Von der Strategie zur Implementierung, wir begleiten Sie in jeder Phase.',
      'service.cloud': 'Cloud & Infrastruktur',
      'service.cloud_desc': 'Nutzen Sie die Skalierbarkeit der Cloud. Migration, Architektur und Kostenoptimierung.',
      'service.ai': 'Künstliche Intelligenz & Daten',
      'service.ai_desc': 'Gewinnen Sie Wert aus Ihren Daten mit künstlicher Intelligenz. Machine Learning und prädiktive Analysen.',
      'service.cybersecurity': 'Cybersicherheit',
      'service.cybersecurity_desc': 'Schützen Sie Ihre digitalen Vermögenswerte. Compliance, Schwachstellenbewertung und Bedrohungsschutz.',
      'service.development': 'Anwendungsentwicklung',
      'service.development_desc': 'Maßgeschneiderte Softwarelösungen für Ihre Anforderungen. Web-, Mobile- und Enterprise-ready APIs.',
      'service.consulting': 'Beratung & Strategie',
      'service.consulting_desc': 'IT- und Business-Alignment. Technologie-Roadmap zur Beschleunigung Ihres Wachstums.',
      'service.learn_more': 'Mehr erfahren →',
      
      // Industries
      'home.industries_title': 'Lösungen für jede Industrie',
      'home.industries_subtitle': 'Vertikale Expertise in geschäftskritischen Sektoren',
      'home.industries_cta': 'Entdecken Sie Branchenlösungen',
      
      // Final CTA
      'home.final_cta_title': 'Bereit, Ihr Geschäft zu transformieren?',
      'home.final_cta_subtitle': 'Kontaktieren Sie uns noch heute für eine kostenlose strategische Beratung. Erfahren Sie, wie wir Ihre digitale Transformation beschleunigen können.',
      'home.final_cta_button': 'Beratung anfordern',
      
      // About Page
      'about.hero_title': 'Über uns',
      'about.hero_subtitle': 'Anführer in strategischer Beratung und digitaler Transformation seit 2009',
      'about.story_title': 'Unsere Geschichte',
      'about.mission_title': 'Mission',
      'about.vision_title': 'Vision',
      'about.values_title': 'Werte',
      'about.team_title': 'Unser Team',
      'about.team_subtitle': 'Talentierte Menschen mit Leidenschaft für Innovation',
      'about.certifications_title': 'Zertifizierungen und Partnerschaften',
      
      // Services Page
      'services.hero_title': 'Unsere Dienstleistungen',
      'services.hero_subtitle': 'Umfassende Lösungen für Ihre digitale Transformation',
      
      // Industries Page
      'industries.hero_title': 'Lösungen für jede Industrie',
      'industries.hero_subtitle': 'Vertikale Expertise mit branchenspezifischer Expertise für geschäftskritische Sektoren',
      'industries.cta_title': 'Können Sie Ihren Sektor nicht finden?',
      'industries.cta_subtitle': 'Wir verlassen uns auf branchenübergreifende Erfahrung, um Innovation in jede Industrie zu bringen',
      
      // Careers Page
      'careers.hero_title': 'Arbeiten Sie mit uns',
      'careers.hero_subtitle': 'Wir bauen die Zukunft der Technologie mit außergewöhnlichen Talenten',
      'careers.culture_title': 'Unsere Kultur',
      'careers.positions_title': 'Offene Positionen',
      'careers.benefits_title': 'Was wir anbieten',
      'careers.cta_title': 'Haben Sie die richtige Position nicht gefunden?',
      'careers.cta_subtitle': 'Senden Sie uns Ihren Lebenslauf für zukünftige Möglichkeiten',
      'careers.view_offers': 'Unsere Angebote sehen',
      'careers.join_us': 'RCODE beitreten',
      
      // Contact Page
      'contact.hero_title': 'Kontaktieren Sie uns',
      'contact.hero_subtitle': 'Lassen Sie uns über Ihre digitale Transformation sprechen',
      'contact.form_title': 'Senden Sie uns eine Nachricht',
      'contact.form_name': 'Vollständiger Name',
      'contact.form_email': 'E-Mail',
      'contact.form_company': 'Unternehmen',
      'contact.form_service': 'Interessante Dienstleistung',
      'contact.form_service_select': 'Wählen Sie einen Dienst',
      'contact.form_service_other': 'Sonstiges',
      'contact.form_message': 'Nachricht',
      'contact.form_message_placeholder': 'Beschreiben Sie kurz Ihr Projekt und Ihre Anforderungen...',
      'contact.form_gdpr': 'Ich habe gelesen und akzeptiert die',
      'contact.form_submit': 'Nachricht senden',
      'contact.form_submitting': 'Wird gesendet...',
      'contact.form_success': '✓ Nachricht erfolgreich versendet! Wir werden Sie bald kontaktieren.',
      'contact.form_validation_error': 'Bitte füllen Sie alle erforderlichen Felder aus',
      'contact.headquarters': 'Hauptsitz',
      'contact.office_rome': 'Büro Rom',
      'contact.email': 'E-Mail',
      'contact.email_general': 'Allgemeine Informationen',
      'contact.email_sales': 'Vertrieb',
      'contact.email_support': 'Unterstützung',
      'contact.social': 'Soziale Medien',
      'contact.office_hours': 'Öffnungszeiten',
      'contact.office_hours_weekday': 'Montag - Freitag: 9:00 - 18:00',
      'contact.office_hours_weekend': 'Samstag - Sonntag: Geschlossen',
      'contact.office_hours_response': 'Wir beantworten alle Anfragen innerhalb von 24 Arbeitstunden',
      'contact.location_finder': 'Finden Sie uns',
      'contact.location_map_description': 'Interaktive Karte mit unseren Standorten',
      
      // Footer
      'footer.company_description': 'Strategischer Partner für digitale Transformation Ihrer Unternehmen. Innovation, Zuverlässigkeit und messbare Ergebnisse.',
      'footer.services': 'Dienstleistungen',
      'footer.company': 'Unternehmen',
      'footer.legal': 'Rechtliches',
      'footer.privacy': 'Datenschutzrichtlinie',
      'footer.cookies': 'Cookie-Richtlinie',
      'footer.copyright': 'Alle Rechte vorbehalten.',
      'footer.gdpr': 'DSGVO konform',
      'footer.iso': 'ISO 27001',
      'footer.enterprise': 'Enterprise Ready',
      
      // Language selector
      'language.italian': 'Italiano',
      'language.english': 'English',
      'language.german': 'Deutsch',
    }
  };

  constructor() {
    // Carica la lingua salvata da localStorage
    const savedLanguage = localStorage.getItem(this.CONSENT_KEY) as Language | null;
    if (savedLanguage && ['it', 'en', 'de'].includes(savedLanguage)) {
      this.currentLanguage.set(savedLanguage);
      this.languageChange$.next(savedLanguage);
    }
  }

  /**
   * Ritorna la traduzione per una chiave
   * Dipende dal segnale currentLanguage per reattività
   */
  translate(key: string): string {
    const lang = this.currentLanguage();
    return this.translations[lang]?.[key] || key;
  }

  /**
   * Ritorna un Observable che emette la traduzione e aggiorna quando la lingua cambia
   * Questo è utile per i componenti che hanno bisogno di reagire al cambio di lingua
   */
  translate$(key: string): Observable<string> {
    return this.languageChange$.asObservable().pipe(
      // Emette anche il valore iniziale
    );
  }

  /**
   * Ritorna un Observable che notifica quando la lingua cambia
   * I componenti possono sottoscriversi a questo per reagire ai cambi di lingua
   */
  onLanguageChange(): Observable<Language> {
    return this.languageChange$.asObservable();
  }

  /**
   * Cambia la lingua
   */
  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
    this.languageChange$.next(language);
    localStorage.setItem(this.CONSENT_KEY, language);
  }

  /**
   * Ritorna la lingua corrente
   */
  getLanguage(): Language {
    return this.currentLanguage();
  }

  /**
   * Ritorna tutte le lingue disponibili
   */
  getAvailableLanguages(): Language[] {
    return ['it', 'en', 'de'];
  }
}
