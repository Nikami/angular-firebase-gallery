import { Component, HostBinding } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ROUTES } from '../../app.config';

interface IRoute {
  title: string;
  path: string;
}

@Component({
  selector: 'afg-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @HostBinding('class') classList: string = 'd-flex flex-column navbar fixed-top';

  routes: Array<IRoute> = [
    {
      title: 'Gallery',
      path: ROUTES.CATEGORIES
    },
    {
      title: 'Upload',
      path: ROUTES.UPLOAD
    }
  ];

  constructor(private auth: AuthService) {
  }

  logout(): void {
    this.auth.logout();
  }
}
