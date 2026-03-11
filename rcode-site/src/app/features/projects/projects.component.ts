import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, type Language } from '../../core/services/translation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface ProjectLink {
  label: string;
  url: string;
  icon: string; // emoji or icon class
  type: 'github' | 'website' | 'appstore' | 'googleplay' | 'download' | 'external';
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  techStack: string[];
  links: ProjectLink[];
  status: 'released' | 'in-development' | 'archived';
  featured: boolean;
  year?: number;
  role?: string;
}

/**
 * Componente Projects - Showcase dei progetti sviluppati
 * Permette di visualizzare progetti con download APK e link a piattaforme esterne
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="projects-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">{{ t('projects.hero_title') }}</h1>
          <p class="hero-subtitle">{{ t('projects.hero_subtitle') }}</p>
        </div>
      </section>

      <!-- Featured Projects -->
      <section class="featured-section" *ngIf="featuredProjects().length > 0">
        <div class="container">
          <h2 class="section-title">{{ t('projects.featured_projects') }}</h2>
          <div class="featured-grid">
            <article class="project-featured" *ngFor="let project of featuredProjects()">
              <div class="project-featured-content">
                <div class="project-header">
                  <h3>{{ project.title }}</h3>
                  <span class="project-status" [class]="'status-' + project.status">
                    {{ t('projects.status.' + project.status) }}
                  </span>
                </div>
                <p class="project-description">{{ project.description }}</p>
                
                <div class="project-meta">
                  <div *ngIf="project.year" class="meta-item">
                    <span class="meta-label">{{ t('projects.year') }}:</span>
                    <span>{{ project.year }}</span>
                  </div>
                  <div *ngIf="project.role" class="meta-item">
                    <span class="meta-label">{{ t('projects.role') }}:</span>
                    <span>{{ project.role }}</span>
                  </div>
                </div>

                <div class="tech-stack">
                  <span class="tech-badge" *ngFor="let tech of project.techStack">{{ tech }}</span>
                </div>

                <div class="project-links">
                  <a *ngFor="let link of project.links" 
                     [href]="link.url" 
                     [title]="link.label"
                     [class]="'link-btn link-' + link.type"
                     target="_blank" 
                     rel="noopener noreferrer">
                    <span class="link-icon">{{ link.icon }}</span>
                    <span class="link-label">{{ link.label }}</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- All Projects -->
      <section class="projects-section">
        <div class="container">
          <h2 class="section-title">{{ t('projects.all_projects') }}</h2>
          
          <!-- Filter by Status -->
          <div class="filters">
            <button class="filter-btn" 
                    [class.active]="activeFilter() === 'all'"
                    (click)="activeFilter.set('all')">
              {{ t('projects.filter_all') }}
            </button>
            <button class="filter-btn" 
                    [class.active]="activeFilter() === 'released'"
                    (click)="activeFilter.set('released')">
              {{ t('projects.status.released') }}
            </button>
            <button class="filter-btn" 
                    [class.active]="activeFilter() === 'in-development'"
                    (click)="activeFilter.set('in-development')">
              {{ t('projects.status.in-development') }}
            </button>
            <button class="filter-btn" 
                    [class.active]="activeFilter() === 'archived'"
                    (click)="activeFilter.set('archived')">
              {{ t('projects.status.archived') }}
            </button>
          </div>

          <!-- Projects Grid -->
          <div class="projects-grid">
            <article class="project-card" *ngFor="let project of filteredProjects()">
              <div class="card-image" *ngIf="project.image">
                <img [src]="project.image" [alt]="project.title">
              </div>
              <div class="card-content">
                <div class="card-header">
                  <h3>{{ project.title }}</h3>
                  <span class="project-status" [class]="'status-' + project.status">
                    {{ t('projects.status.' + project.status) }}
                  </span>
                </div>
                <p class="project-desc">{{ project.description }}</p>
                
                <div class="tech-stack">
                  <span class="tech-badge" *ngFor="let tech of project.techStack">{{ tech }}</span>
                </div>

                <div class="card-links">
                  <a *ngFor="let link of project.links" 
                     [href]="link.url" 
                     [title]="link.label"
                     [class]="'link-small link-' + link.type"
                     target="_blank" 
                     rel="noopener noreferrer">
                    <span class="link-icon">{{ link.icon }}</span>
                    <span class="link-label">{{ link.label }}</span>
                  </a>
                </div>
              </div>
            </article>
          </div>

          <!-- Empty State -->
          <div class="empty-state" *ngIf="filteredProjects().length === 0">
            <p>{{ t('projects.no_projects') }}</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <h2>{{ t('projects.cta_title') }}</h2>
          <p>{{ t('projects.cta_subtitle') }}</p>
          <a href="/contatti" class="btn-primary">{{ t('projects.cta_button') }}</a>
        </div>
      </section>
    </div>
  `,
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  activeFilter = signal<'all' | 'released' | 'in-development' | 'archived'>('all');

  // Sample Projects - potranno essere caricati da un servizio in futuro
  projects: Project[] = [
    {
      id: 'ecommerce-platform',
      title: 'E-Commerce Platform',
      description: 'Piattaforma e-commerce completa con gestione catalogo, carrello e pagamenti integrati.',
      longDescription: 'Una piattaforma e-commerce enterprise con Angular frontend, Node.js backend e database PostgreSQL. Integrazione con Stripe per i pagamenti e AWS per l\'hosting.',
      image: undefined,
      techStack: ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
      status: 'released',
      featured: true,
      year: 2023,
      role: 'Full-Stack Developer',
      links: [
        { label: 'GitHub', url: 'https://github.com', icon: '🔗', type: 'github' },
        { label: 'Website', url: 'https://example.com', icon: '🌐', type: 'website' }
      ]
    },
    {
      id: 'saas-analytics',
      title: 'SaaS Analytics Platform',
      description: 'Piattaforma analytics in tempo reale con dashboard personalizzabili e reportistica avanzata.',
      image: undefined,
      techStack: ['Angular', 'TypeScript', 'Express.js', 'MongoDB', 'Kafka', 'AWS'],
      status: 'released',
      featured: true,
      year: 2023,
      role: 'Senior Backend Developer',
      links: [
        { label: 'GitHub', url: 'https://github.com', icon: '🔗', type: 'github' },
        { label: 'Website', url: 'https://example.com', icon: '🌐', type: 'website' }
      ]
    },
    {
      id: 'mobile-app-pwa',
      title: 'Mobile App PWA',
      description: 'Applicazione web progressiva con funzionalità offline e installazione home screen.',
      image: undefined,
      techStack: ['Angular', 'Service Workers', 'Firebase', 'PWA', 'Responsive Design'],
      status: 'released',
      featured: false,
      year: 2023,
      role: 'Frontend Developer',
      links: [
        { label: 'Download APK', url: '#', icon: '📱', type: 'download' },
        { label: 'App Store', url: 'https://apple.com/app-store', icon: '🍎', type: 'appstore' },
        { label: 'Google Play', url: 'https://play.google.com', icon: '▶️', type: 'googleplay' }
      ]
    },
    {
      id: 'microservices-api',
      title: 'RESTful API Microservices',
      description: 'Architettura microservizi con API RESTful, containerizzazione Docker e orchestrazione Kubernetes.',
      image: undefined,
      techStack: ['Node.js', 'Express', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
      status: 'released',
      featured: false,
      year: 2022,
      role: 'Backend Architect',
      links: [
        { label: 'GitHub', url: 'https://github.com', icon: '🔗', type: 'github' },
        { label: 'API Docs', url: 'https://example.com/docs', icon: '📚', type: 'external' }
      ]
    },
    {
      id: 'data-pipeline',
      title: 'Data Processing Pipeline',
      description: 'Pipeline di elaborazione dati ad alta performance con AWS Lambda e Redis caching.',
      image: undefined,
      techStack: ['Node.js', 'PostgreSQL', 'Redis', 'AWS Lambda', 'CloudWatch'],
      status: 'released',
      featured: false,
      year: 2022,
      role: 'Data Engineer',
      links: [
        { label: 'GitHub', url: 'https://github.com', icon: '🔗', type: 'github' }
      ]
    },
    {
      id: 'cms-system',
      title: 'Content Management System',
      description: 'CMS headless con Angular frontend, Node.js backend e Supabase come database.',
      image: undefined,
      techStack: ['Angular', 'Node.js', 'MongoDB', 'Supabase', 'Authentication'],
      status: 'in-development',
      featured: false,
      year: 2024,
      role: 'Full-Stack Developer',
      links: [
        { label: 'GitHub', url: 'https://github.com', icon: '🔗', type: 'github' }
      ]
    }
  ];

  // Ritorna i progetti in evidenza
  featuredProjects = signal<Project[]>([]);

  // Ritorna i progetti filtrati in base al filtro attivo
  filteredProjects = signal<Project[]>([]);

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.updateProjects();

    // Subscribe to language changes
    this.translationService.onLanguageChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateProjects();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Traduce una chiave
   */
  t(key: string): string {
    return this.translationService.translate(key);
  }

  /**
   * Aggiorna i progetti in base al filtro
   */
  private updateProjects(): void {
    const featured = this.projects.filter(p => p.featured);
    this.featuredProjects.set(featured);

    const filtered = this.activeFilter() === 'all'
      ? this.projects
      : this.projects.filter(p => p.status === this.activeFilter());
    this.filteredProjects.set(filtered);
  }
}
