import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../../shared/shared.models';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { COOKIE, ROUTES } from '../../app.config';
import { Subject } from 'rxjs/internal/Subject';
import UserCredential = firebase.auth.UserCredential;
import IdTokenResult = firebase.auth.IdTokenResult;

export enum AUTH_SUBJECT {
  ERROR = 'error',
  SESSION = 'session'
}

interface IAuthState {
  error: Subject<string | null>;
  session: Subject<string | null>;
}

@Injectable()
export class AuthService {
  private state: IAuthState = {
    error: new Subject(),
    session: new Subject()
  };

  constructor(
    private firebaseAuth: AngularFireAuth,
    private cookie: CookieService,
    private router: Router
  ) {}

  async login(credentials: IUser): Promise<boolean | void> {
    this.cookie.remove(COOKIE.TOKEN);
    try {
      const uCreds: UserCredential = await this.firebaseAuth.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      );
      const uToken: IdTokenResult = await uCreds.user.getIdTokenResult(false);
      this.cookie.put(COOKIE.TOKEN, uToken.token, {
        expires: uToken.expirationTime
      });
      this.cookie.put(COOKIE.SESSION, uToken.expirationTime, {
        expires: uToken.expirationTime
      });
      this.set(AUTH_SUBJECT.SESSION, uToken.expirationTime);

      this.router.navigateByUrl(ROUTES.DEFAULT);
    } catch (err) {
      this.set(AUTH_SUBJECT.ERROR, err.message);
    }
  }

  public logout(): void {
    this.firebaseAuth.auth.signOut().then(() => {
      this.cookie.remove(COOKIE.TOKEN);
      this.cookie.remove(COOKIE.SESSION);
      this.router.navigateByUrl(ROUTES.AUTH).then(() => location.reload());
    });
  }

  public get(key: keyof IAuthState): Subject<any> {
    return this.state[key];
  }

  private set(key: keyof IAuthState, value: any): void {
    (<any>this.state[key]).next(value);
  }
}
