import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente Root dell'applicazione
 * Contiene il router outlet principale
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.scss'
})
export class App {}
