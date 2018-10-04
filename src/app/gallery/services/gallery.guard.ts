import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { COOKIE } from '../../app.config';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AuthService } from '../../auth/services/auth.service';


@Injectable()
export class GalleryGuard implements CanActivate, CanActivateChild {
  constructor(private firebaseAuth: AngularFireAuth,
              private cookie: CookieService,
              private auth: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.firebaseAuth.authState.pipe(
      switchMap((user: User) => {
        const promise: Promise<string> = user ? user.getIdToken(false) : Promise.resolve('');
        return fromPromise(promise);
      }),
      map((token: string) => token === this.cookie.get(COOKIE.TOKEN)),
      tap((canActivate: boolean) => {
        if (!canActivate) {
          this.auth.logout();
        }
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
