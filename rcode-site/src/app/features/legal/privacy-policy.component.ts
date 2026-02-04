import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaService } from '../../core/services/meta.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="legal-page">
      <div class="container">
        <h1>Privacy Policy</h1>
        <p class="last-updated">Ultimo aggiornamento: Febbraio 2025</p>

        <div class="legal-content">
          <h2>1. Introduzione</h2>
          <p>
            Innova Tech Solutions ("Società") rispetta la privacy dei nostri utenti ("tu" o "utente"). 
            Questa Privacy Policy descrive come raccogliamo, utilizziamo, condividiamo e proteggiamo 
            le tue informazioni personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR) 
            - Regolamento UE 2016/679.
          </p>

          <h2>2. Titolare del Trattamento</h2>
          <p>
            <strong>RCODE S.p.A.</strong><br>
            Via Innovazione 42, 20100 Milano (MI)<br>
            Email: <a href="mailto:privacy@rcode.it">privacy@rcode.it</a><br>
            Partita IVA: IT12345678910
          </p>

          <h2>3. Dati Personali Raccolti</h2>
          <p>Raccogliamo i seguenti tipi di dati personali:</p>
          <ul>
            <li><strong>Dati Identificativi:</strong> Nome, cognome, email, numero di telefono, azienda</li>
            <li><strong>Dati di Navigazione:</strong> Indirizzo IP, tipo di browser, pagine visitate, durata della visita</li>
            <li><strong>Dati di Cookie:</strong> Identificatori unici per preferenze e tracking</li>
            <li><strong>Dati Forniti Volontariamente:</strong> Moduli di contatto, feedback, messaggi</li>
          </ul>

          <h2>4. Basi Legali del Trattamento</h2>
          <p>Trattiamo i tuoi dati sulla base delle seguenti basi legali (art. 6 GDPR):</p>
          <ul>
            <li><strong>Esecuzione del Contratto:</strong> Per fornire i servizi richiesti</li>
            <li><strong>Consenso:</strong> Per cookie non essenziali e comunicazioni marketing</li>
            <li><strong>Interesse Legittimo:</strong> Per migliorare il sito e prevenire frodi</li>
            <li><strong>Obblighi Legali:</strong> Per conformità fiscale e normative</li>
          </ul>

          <h2>5. Finalità del Trattamento</h2>
          <p>Utilizziamo i tuoi dati per:</p>
          <ul>
            <li>Fornire i servizi di consulenza richiesti</li>
            <li>Rispondere alle tue richieste di contatto</li>
            <li>Migliorare la sicurezza e funzionalità del sito</li>
            <li>Inviare comunicazioni marketing (con consenso)</li>
            <li>Analizzare l'utilizzo del sito attraverso analytics</li>
            <li>Conformità normativa e prevenzione frodi</li>
          </ul>

          <h2>6. Condivisione dei Dati</h2>
          <p>Condividiamo i tuoi dati con:</p>
          <ul>
            <li><strong>Service Provider:</strong> Fornitori di hosting, email, analytics</li>
            <li><strong>Partner Commerciali:</strong> Solo con tuo consenso esplicito</li>
            <li><strong>Autorità Competenti:</strong> Se richiesto per obblighi legali</li>
          </ul>
          <p>
            Non vendiamo mai i tuoi dati personali a terze parti per scopi commerciali.
          </p>

          <h2>7. Trasferimento Internazionale</h2>
          <p>
            Alcuni dati potrebbero essere trasferiti a servizi ubicati al di fuori dell'UE. 
            Utilizziamo standard contrattuali approvati (es. Standard Contractual Clauses - SCC) 
            per garantire un livello di protezione adeguato.
          </p>

          <h2>8. Conservazione dei Dati</h2>
          <p>
            Conserviamo i tuoi dati personali solo per il tempo necessario alle finalità per cui sono stati raccolti:
          </p>
          <ul>
            <li>Dati di registrazione: Per la durata del rapporto + 5 anni (per obblighi fiscali)</li>
            <li>Dati di navigazione: Fino a 12 mesi</li>
            <li>Dati di cookie: Secondo le impostazioni del banner cookie</li>
          </ul>

          <h2>9. Diritti dell'Interessato (GDPR)</h2>
          <p>Hai i seguenti diritti sotto il GDPR:</p>
          <ul>
            <li><strong>Diritto di Accesso:</strong> Richiedere copia dei tuoi dati</li>
            <li><strong>Diritto di Rettifica:</strong> Correggere dati inesatti</li>
            <li><strong>Diritto all'Oblio:</strong> Richiedere cancellazione dei dati</li>
            <li><strong>Diritto alla Limitazione:</strong> Limitare il trattamento</li>
            <li><strong>Diritto di Portabilità:</strong> Ricevere i dati in formato strutturato</li>
            <li><strong>Diritto di Opposizione:</strong> Opporsi al trattamento per marketing</li>
          </ul>
          <p>
            Per esercitare questi diritti, contatta: <a href="mailto:privacy@innovatetech.it">privacy@innovatetech.it</a>
          </p>

          <h2>10. Sicurezza dei Dati</h2>
          <p>
            Implementiamo misure di sicurezza tecniche e organizzative per proteggere i tuoi dati:
          </p>
          <ul>
            <li>Crittografia SSL/TLS per le trasmissioni</li>
            <li>Controlli di accesso e autenticazione</li>
            <li>Backup regolari</li>
            <li>Compliance ISO 27001</li>
          </ul>

          <h2>11. Cookie</h2>
          <p>
            Per dettagli sui cookie utilizzati, consulta la nostra <a href="/cookie-policy">Cookie Policy</a>.
          </p>

          <h2>12. Minori</h2>
          <p>
            Il nostro sito non è rivolto a minori di 16 anni. Se scopriamo che hai raccolto dati 
            di un minore, elimineremo tali informazioni immediatamente.
          </p>

          <h2>13. Modifiche a Questa Privacy Policy</h2>
          <p>
            Potremmo aggiornare questa Privacy Policy di tanto in tanto. 
            Ti notificheremo di eventuali cambiamenti materiali via email o tramite avviso prominente 
            sulla nostra Pagina Principale.
          </p>

          <h2>14. Contatti</h2>
          <p>
            Per domande sulla nostra Privacy Policy, contatta:<br><br>
            <strong>Data Protection Officer (DPO)</strong><br>
            Innova Tech Solutions<br>
            Email: <a href="mailto:dpo@innovatetech.it">dpo@innovatetech.it</a><br><br>
            <strong>Autorità Competente (Garante della Privacy)</strong><br>
            Garante per la Protezione dei Dati Personali<br>
            Piazza di Monte Citorio, 121, 00186 Roma<br>
            Sito: <a href="https://www.garanteprivacy.it" target="_blank">www.garanteprivacy.it</a>
          </p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './legal.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit(): void {
    this.metaService.setMetaTags({
      title: 'Privacy Policy',
      description: 'Privacy Policy GDPR-compliant di Innova Tech Solutions.',
      url: 'https://www.innovatetech.it/privacy-policy'
    });
  }
}
