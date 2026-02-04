import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="legal-page">
      <div class="container">
        <h1>Cookie Policy</h1>
        <p class="last-updated">Ultimo aggiornamento: Febbraio 2025</p>

        <div class="legal-content">
          <h2>1. Cosa sono i Cookie?</h2>
          <p>
            I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti il nostro sito. 
            Ci aiutano a riconoscere il tuo browser e memorizzare informazioni sulle tue preferenze.
          </p>

          <h2>2. Tipi di Cookie Utilizzati</h2>
          
          <h3>2.1 Cookie Tecnici (Essenziali)</h3>
          <p>
            Questi cookie sono necessari per il funzionamento del sito e non richiedono consenso:
          </p>
          <ul>
            <li><strong>Session ID:</strong> Per gestire la tua sessione di navigazione</li>
            <li><strong>CSRF Token:</strong> Per la sicurezza dei form</li>
            <li><strong>Preferenze Linguaggio:</strong> Per ricordare le tue preferenze</li>
            <li><strong>Cookie Banner:</strong> Per ricordare le tue scelte di consenso</li>
          </ul>

          <h3>2.2 Cookie Analytics</h3>
          <p>
            Utilizzati per analizzare come gli utenti utilizzano il nostro sito (con consenso):
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> Per tracciare visite, pagine visitate, durata sessione</li>
            <li><strong>Heatmap:</strong> Per comprendere dove gli utenti cliccano</li>
          </ul>

          <h3>2.3 Cookie Marketing</h3>
          <p>
            Utilizzati per mostrarti annunci personalizzati (con consenso):
          </p>
          <ul>
            <li><strong>Facebook Pixel:</strong> Per il retargeting su Facebook</li>
            <li><strong>Google Ads:</strong> Per annunci personalizzati su Google</li>
          </ul>

          <h2>3. Cookie di Terze Parti</h2>
          <p>
            Il nostro sito potrebbe contenere contenuti di terze parti (video, mappe, annunci) 
            che potrebbero impostare cookie propri. Non abbiamo controllo su questi cookie.
          </p>

          <h2>4. Come Gestiamo i Cookie</h2>
          <p>
            Al primo accesso al sito, vedrai un banner cookie che ti permette di:
          </p>
          <ul>
            <li><strong>Accettare Tutto:</strong> Accettare tutti i cookie (analitici e marketing)</li>
            <li><strong>Rifiutare:</strong> Rifiutare tutti i cookie non essenziali</li>
            <li><strong>Personalizzare:</strong> Scegliere quali cookie accettare</li>
          </ul>

          <h2>5. Come Disabilitare i Cookie</h2>
          <p>
            Puoi controllare i cookie tramite le impostazioni del tuo browser:
          </p>
          <ul>
            <li><strong>Chrome:</strong> Menu → Impostazioni → Privacy e sicurezza → Cookie</li>
            <li><strong>Firefox:</strong> Menu → Preferenze → Privacy → Cookie</li>
            <li><strong>Safari:</strong> Preferenze → Privacy → Gestisci dati sito web</li>
            <li><strong>Edge:</strong> Impostazioni → Privacy → Gestisci dati di navigazione</li>
          </ul>
          <p>
            <strong>Nota:</strong> Disabilitare i cookie potrebbe compromettere la funzionalità del sito.
          </p>

          <h2>6. Basi Legali</h2>
          <p>
            L'utilizzo dei cookie è conforme al:
          </p>
          <ul>
            <li><strong>ePrivacy Directive (2002/58/EC):</strong> Regola sull'uso dei cookie</li>
            <li><strong>GDPR (EU 2016/679):</strong> Protezione dei dati personali</li>
            <li><strong>Normativa Italiana:</strong> Decreto Legislativo 196/2003</li>
          </ul>

          <h2>7. Durata dei Cookie</h2>
          <ul>
            <li><strong>Session Cookie:</strong> Eliminati alla chiusura del browser</li>
            <li><strong>Persistent Cookie:</strong> Conservati fino a 12 mesi</li>
            <li><strong>Consenso Cookie:</strong> Conservato per 12 mesi</li>
          </ul>

          <h2>8. Cookie e Privacy</h2>
          <p>
            Per informazioni su come i tuoi dati sono trattati attraverso i cookie, 
            consulta la nostra <a href="/privacy-policy">Privacy Policy</a>.
          </p>

          <h2>9. Modifiche a Questa Cookie Policy</h2>
          <p>
            Potremmo aggiornare questa policy di tanto in tanto. 
            Le modifiche entreranno in vigore immediamente.
          </p>

          <h2>10. Contatti</h2>
          <p>
            Per domande sui nostri cookie, contatta:<br><br>
            Email: <a href="mailto:privacy@innovatetech.it">privacy@innovatetech.it</a>
          </p>

          <h2>11. Link Utili</h2>
          <ul>
            <li><a href="https://cookiepedia.co.uk/" target="_blank">Cookiepedia - Database dei Cookie</a></li>
            <li><a href="https://www.allaboutcookies.org/" target="_blank">All About Cookies - Informazioni sui Cookie</a></li>
            <li><a href="https://www.garanteprivacy.it/" target="_blank">Garante della Privacy - Italia</a></li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styleUrl: './legal.component.scss'
})
export class CookiePolicyComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.setMetaTags({
      title: 'Cookie Policy',
      description: 'Cookie Policy di Innova Tech Solutions. Scopri come utilizziamo i cookie.',
      url: 'https://www.innovatetech.it/cookie-policy'
    });
  }
}
