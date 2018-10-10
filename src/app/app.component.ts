import { Component } from '@angular/core';
import { SessionExpirationService } from './core/services/session-expiration.service';

@Component({
  selector: 'afg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private session: SessionExpirationService) {}
}
