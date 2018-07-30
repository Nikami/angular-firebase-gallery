import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class GalleryGuard implements CanActivate {
  constructor(private cookie: CookieService) {
  }

  canActivate(): boolean {
    return !!(this.cookie.get('token'));
  }
}
