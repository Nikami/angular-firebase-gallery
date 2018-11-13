import { Component, OnInit } from '@angular/core';
import { SessionExpirationService } from './core/services/session-expiration.service';
import { OfflineService } from './core/services/offline.service';

@Component({
  selector: 'afg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private session: SessionExpirationService,
    private offline: OfflineService
  ) {}

  ngOnInit(): void {
    this.session.init();
    this.offline.init();
  }
}
