import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { COOKIE, ROUTES } from '../../app.config';

@Injectable()
export class GalleryGuard implements CanActivate, CanActivateChild {
  constructor(private cookie: CookieService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (!!(this.cookie.get(COOKIE.TOKEN))) {
      return true;
    } else {
      this.router.navigateByUrl(ROUTES.AUTH);
      return false;
    }
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
