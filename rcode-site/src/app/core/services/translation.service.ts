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
      'nav.about': 'Chi Sono',
      'nav.services': 'Competenze',
      'nav.industries': 'Portfolio',
      'nav.careers': 'Opportunità',
      'nav.contact': 'Contatti',
      'nav.request_consultation': 'Richiedi Consulenza',
      'nav.join_team': 'Unisciti al team',
      
      // Homepage
      'home.hero_title': 'Full-stack Developer',
      'home.hero_title_gradient': 'Specializzato in Web & Cloud',
      'home.hero_subtitle': 'Creo soluzioni software di qualità, dalle API backend alle interfacce frontend responsive. Appassionato di clean code, architetture scalabili e best practices.',
      'home.hero_cta_primary': 'Contattami per un progetto',
      'home.hero_cta_secondary': 'Scopri il mio portfolio',
      'home.hero_stat_1': '50+',
      'home.hero_stat_1_label': 'Progetti completati',
      'home.hero_stat_2': '8+',
      'home.hero_stat_2_label': 'Anni di programmazione',
      'home.hero_stat_3': '100%',
      'home.hero_stat_3_label': 'Impegno nel progetto',
      
      // Value Proposition
      'home.vp_title': 'Perché scegliere me?',
      'home.vp_subtitle': 'Tre punti di forza del mio approccio',
      'home.vp_card_1_title': 'Clean Code',
      'home.vp_card_1_text': 'Scrivo codice leggibile, mantenibile e testato. Ogni soluzione è strutturata per essere scalabile e facilmente extensible nel tempo.',
      'home.vp_card_2_title': 'Tech Stack Moderno',
      'home.vp_card_2_text': 'Expertise in Angular, TypeScript, Node.js, SQL e cloud (AWS/GCP). Aggiornato costantemente sulle nuove tecnologie.',
      'home.vp_card_3_title': 'Problem Solving',
      'home.vp_card_3_text': 'Affronto ogni progetto con una mentalità di problem solving. Non solo codifico: analizzo, progetto e ottimizo.',
      
      // Services Overview
      'home.services_title': 'Le mie competenze principali',
      'home.services_subtitle': 'Teknologie e aree di expertise su cui mi concentro',
      'home.services_cta': 'Scopri tutte le competenze',
      
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
      
      // Portfolio Page (Projects)
      'portfolio.hero_title': 'Portfolio',
      'portfolio.hero_subtitle': 'Progetti che ho realizzato e storie di successo',
      'portfolio.featured_projects': 'Progetti In Evidenza',
      'portfolio.all_projects': 'Tutti i Progetti',
      'portfolio.view_project': 'Vedi Progetto',
      'portfolio.tech_stack': 'Tech Stack',

      // Careers/Open to work Page
      'careers.hero_title': 'Disponibile per Collaborazioni',
      'careers.hero_subtitle': 'Cerco nuove sfide e opportunità interessanti',
      'careers.status_title': 'Lo Stato Attuale',
      'careers.status_description': 'Sono disponibile per progetti freelance, contract e opportunità full-time. Mi piace lavorare su sfide tecniche interessanti con team appassionati.',
      'careers.skills_title': 'Competenze Principali',
      'careers.experience_title': 'Esperienza',
      'careers.cta_title': 'Hai un progetto interessante?',
      'careers.cta_subtitle': 'Contattami per discutere una possibile collaborazione',
      'careers.view_offers': 'Contattami',
      'careers.join_us': 'Collaboriamo',
      
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
      'footer.company_description': 'Full-stack developer appassionato di clean code e architetture scalabili. Trasformo idee in soluzioni software di qualità.',
      'footer.services': 'Servizi',
      'footer.company': 'Azienda',
      'footer.legal': 'Legal',
      'footer.privacy': 'Privacy Policy',
      'footer.cookies': 'Cookie Policy',
      'footer.copyright': 'Tutti i diritti riservati.',
      'footer.gdpr': 'GDPR Compliant',
      'footer.iso': 'ISO 27001',
      'footer.enterprise': 'Enterprise Ready',

      // Cookie Banner
      'cookie.preferences': 'Preferenze Cookie',
      'cookie.description': 'Utilizziamo cookie per migliorare la tua esperienza di navigazione, personalizzare i contenuti e analizzare il traffico del sito.',
      'cookie.learn_more': 'Scopri di più',
      'cookie.necessary_title': 'Cookie Tecnici (Necessari)',
      'cookie.necessary_desc': 'Sempre abilitati per il funzionamento del sito',
      'cookie.analytics_title': 'Cookie Analytics',
      'cookie.analytics_desc': 'Ci aiutano a capire come utilizzi il sito',
      'cookie.marketing_title': 'Cookie Marketing',
      'cookie.marketing_desc': 'Utilizzati per mostrarti annunci personalizzati',
      'cookie.show_details': 'Mostra dettagli',
      'cookie.hide_details': 'Nascondi dettagli',
      'cookie.reject_all': 'Rifiuta Tutto',
      'cookie.accept_all': 'Accetta Tutto',
      'cookie.gdpr_compliance': 'Conformità a',

      // Language selector
      'language.italian': 'Italiano',
      'language.english': 'English',
      'language.german': 'Deutsch',
    },

    en: {
      // Header & Navigation
      'nav.home': 'Home',
      'nav.about': 'About Me',
      'nav.services': 'Skills',
      'nav.industries': 'Portfolio',
      'nav.careers': 'Opportunities',
      'nav.contact': 'Contact',
      'nav.request_consultation': 'Request Consultation',
      'nav.join_team': 'Join the Team',
      
      // Homepage
      'home.hero_title': 'Full-stack Developer',
      'home.hero_title_gradient': 'Specialized in Web & Cloud',
      'home.hero_subtitle': 'I create quality software solutions, from backend APIs to responsive frontend interfaces. Passionate about clean code, scalable architectures and best practices.',
      'home.hero_cta_primary': 'Contact me for a project',
      'home.hero_cta_secondary': 'Discover my portfolio',
      'home.hero_stat_1': '50+',
      'home.hero_stat_1_label': 'Projects completed',
      'home.hero_stat_2': '8+',
      'home.hero_stat_2_label': 'Years of coding',
      'home.hero_stat_3': '100%',
      'home.hero_stat_3_label': 'Project commitment',
      
      // Value Proposition
      'home.vp_title': 'Why choose me?',
      'home.vp_subtitle': 'Three strengths of my approach',
      'home.vp_card_1_title': 'Clean Code',
      'home.vp_card_1_text': 'I write readable, maintainable and tested code. Every solution is structured to be scalable and easily extensible over time.',
      'home.vp_card_2_title': 'Modern Tech Stack',
      'home.vp_card_2_text': 'Expertise in Angular, TypeScript, Node.js, SQL and cloud (AWS/GCP). Constantly updated on new technologies.',
      'home.vp_card_3_title': 'Problem Solving',
      'home.vp_card_3_text': 'I approach every project with a problem-solving mindset. Not just coding: analyzing, designing and optimizing.',
      
      // Services Overview
      'home.services_title': 'My core skills',
      'home.services_subtitle': 'Technologies and areas of expertise I focus on',
      'home.services_cta': 'Discover all skills',
      
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
      
      // Portfolio Page (Projects)
      'portfolio.hero_title': 'Portfolio',
      'portfolio.hero_subtitle': 'Projects I\'ve built and success stories',
      'portfolio.featured_projects': 'Featured Projects',
      'portfolio.all_projects': 'All Projects',
      'portfolio.view_project': 'View Project',
      'portfolio.tech_stack': 'Tech Stack',

      // Careers/Open to work Page
      'careers.hero_title': 'Available for Collaborations',
      'careers.hero_subtitle': 'Looking for new challenges and interesting opportunities',
      'careers.status_title': 'Current Status',
      'careers.status_description': 'I\'m available for freelance projects, contracts and full-time opportunities. I love working on interesting technical challenges with passionate teams.',
      'careers.skills_title': 'Core Skills',
      'careers.experience_title': 'Experience',
      'careers.cta_title': 'Have an interesting project?',
      'careers.cta_subtitle': 'Contact me to discuss a possible collaboration',
      'careers.view_offers': 'Contact Me',
      'careers.join_us': 'Let\'s Collaborate',
      
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
      'footer.company_description': 'Passionate full-stack developer focused on clean code and scalable architectures. I transform ideas into quality software solutions.',
      'footer.services': 'Services',
      'footer.company': 'Company',
      'footer.legal': 'Legal',
      'footer.privacy': 'Privacy Policy',
      'footer.cookies': 'Cookie Policy',
      'footer.copyright': 'All rights reserved.',
      'footer.gdpr': 'GDPR Compliant',
      'footer.iso': 'ISO 27001',
      'footer.enterprise': 'Enterprise Ready',

      // Cookie Banner
      'cookie.preferences': 'Cookie Preferences',
      'cookie.description': 'We use cookies to improve your browsing experience, personalize content and analyze site traffic.',
      'cookie.learn_more': 'Learn more',
      'cookie.necessary_title': 'Technical Cookies (Required)',
      'cookie.necessary_desc': 'Always enabled for site functionality',
      'cookie.analytics_title': 'Analytics Cookies',
      'cookie.analytics_desc': 'Help us understand how you use the site',
      'cookie.marketing_title': 'Marketing Cookies',
      'cookie.marketing_desc': 'Used to show you personalized ads',
      'cookie.show_details': 'Show details',
      'cookie.hide_details': 'Hide details',
      'cookie.reject_all': 'Reject All',
      'cookie.accept_all': 'Accept All',
      'cookie.gdpr_compliance': 'Compliant with',

      // Language selector
      'language.italian': 'Italian',
      'language.english': 'English',
      'language.german': 'German',
    },

    de: {
      // Header & Navigation
      'nav.home': 'Startseite',
      'nav.about': 'Über mich',
      'nav.services': 'Fähigkeiten',
      'nav.industries': 'Portfolio',
      'nav.careers': 'Möglichkeiten',
      'nav.contact': 'Kontakt',
      'nav.request_consultation': 'Beratung anfordern',
      'nav.join_team': 'Team beitreten',
      
      // Homepage
      'home.hero_title': 'Full-Stack-Entwickler',
      'home.hero_title_gradient': 'Spezialisiert auf Web & Cloud',
      'home.hero_subtitle': 'Ich erstelle hochwertige Softwarelösungen von Backend-APIs bis zu responsiven Frontend-Schnittstellen. Leidenschaftlich um sauberen Code, skalierbare Architekturen und Best Practices.',
      'home.hero_cta_primary': 'Kontaktiere mich für ein Projekt',
      'home.hero_cta_secondary': 'Entdecke mein Portfolio',
      'home.hero_stat_1': '50+',
      'home.hero_stat_1_label': 'Projekte abgeschlossen',
      'home.hero_stat_2': '8+',
      'home.hero_stat_2_label': 'Jahre Programmierung',
      'home.hero_stat_3': '100%',
      'home.hero_stat_3_label': 'Projektverpflichtung',
      
      // Value Proposition
      'home.vp_title': 'Warum mich wählen?',
      'home.vp_subtitle': 'Drei Stärken meines Ansatzes',
      'home.vp_card_1_title': 'Sauberer Code',
      'home.vp_card_1_text': 'Ich schreibe lesbaren, wartbaren und getesteten Code. Jede Lösung ist strukturiert, um im Laufe der Zeit skalierbar und leicht erweiterbar zu sein.',
      'home.vp_card_2_title': 'Moderner Tech Stack',
      'home.vp_card_2_text': 'Expertise in Angular, TypeScript, Node.js, SQL und Cloud (AWS/GCP). Ständig aktualisiert über neue Technologien.',
      'home.vp_card_3_title': 'Problemlösung',
      'home.vp_card_3_text': 'Ich gehe jedes Projekt mit einer Problemlösungsmentalität an. Nicht nur Programmieren: Analysieren, Entwerfen und Optimieren.',
      
      // Services Overview
      'home.services_title': 'Meine Kernkompetenzen',
      'home.services_subtitle': 'Technologien und Fachbereiche, auf die ich mich konzentriere',
      'home.services_cta': 'Entdecke alle Fähigkeiten',
      
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
      
      // Portfolio Page (Projects)
      'portfolio.hero_title': 'Portfolio',
      'portfolio.hero_subtitle': 'Projekte, die ich gebaut habe und Erfolgsgeschichten',
      'portfolio.featured_projects': 'Ausgewählte Projekte',
      'portfolio.all_projects': 'Alle Projekte',
      'portfolio.view_project': 'Projekt anzeigen',
      'portfolio.tech_stack': 'Tech Stack',

      // Careers/Open to work Page
      'careers.hero_title': 'Verfügbar für Zusammenarbeit',
      'careers.hero_subtitle': 'Auf der Suche nach neuen Herausforderungen und interessanten Möglichkeiten',
      'careers.status_title': 'Aktueller Status',
      'careers.status_description': 'Ich bin verfügbar für Freiberufler-Projekte, Verträge und Vollzeitpositionen. Ich liebe es, an interessanten technischen Herausforderungen mit leidenschaftlichen Teams zu arbeiten.',
      'careers.skills_title': 'Kernkompetenzen',
      'careers.experience_title': 'Erfahrung',
      'careers.cta_title': 'Haben Sie ein interessantes Projekt?',
      'careers.cta_subtitle': 'Kontaktieren Sie mich, um eine mögliche Zusammenarbeit zu besprechen',
      'careers.view_offers': 'Kontakt',
      'careers.join_us': 'Lassen Sie uns zusammenarbeiten',
      
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
      'footer.company_description': 'Leidenschaftlicher Full-Stack-Entwickler, konzentriert auf sauberen Code und skalierbare Architekturen. Ich transformiere Ideen in hochwertige Softwarelösungen.',
      'footer.services': 'Dienstleistungen',
      'footer.company': 'Unternehmen',
      'footer.legal': 'Rechtliches',
      'footer.privacy': 'Datenschutzrichtlinie',
      'footer.cookies': 'Cookie-Richtlinie',
      'footer.copyright': 'Alle Rechte vorbehalten.',
      'footer.gdpr': 'DSGVO konform',
      'footer.iso': 'ISO 27001',
      'footer.enterprise': 'Enterprise Ready',

      // Cookie Banner
      'cookie.preferences': 'Cookie-Einstellungen',
      'cookie.description': 'Wir verwenden Cookies, um Ihr Browsererlebnis zu verbessern, Inhalte zu personalisieren und Website-Traffic zu analysieren.',
      'cookie.learn_more': 'Mehr erfahren',
      'cookie.necessary_title': 'Technische Cookies (Erforderlich)',
      'cookie.necessary_desc': 'Immer aktiviert für die Website-Funktionalität',
      'cookie.analytics_title': 'Analytics-Cookies',
      'cookie.analytics_desc': 'Helfen uns zu verstehen, wie Sie die Website nutzen',
      'cookie.marketing_title': 'Marketing-Cookies',
      'cookie.marketing_desc': 'Werden verwendet, um Ihnen personalisierte Anzeigen zu zeigen',
      'cookie.show_details': 'Details anzeigen',
      'cookie.hide_details': 'Details ausblenden',
      'cookie.reject_all': 'Alle ablehnen',
      'cookie.accept_all': 'Alle akzeptieren',
      'cookie.gdpr_compliance': 'Konform mit',

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
