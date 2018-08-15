import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IUser } from '../../shared/shared.models';
import { User } from 'firebase';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { COOKIE, ROUTES } from '../../app.config';

export enum AUTH_SUBJECT {
  USER = 'user',
  ERROR = 'error'
}

interface IAuthState {
  user: ReplaySubject<User | null>,
  error: ReplaySubject<string | null>
}

@Injectable()
export class AuthService {
  private state: IAuthState = {
    user: new ReplaySubject(1),
    error: new ReplaySubject(1)
  };

  constructor(private firebaseAuth: AngularFireAuth,
              private cookie: CookieService,
              private router: Router) {
    this.subscribeToFbaseAuthState();
  }

  public login(credentials: IUser): void {
    this.cookie.remove(COOKIE.TOKEN);
    this.firebaseAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch((err: Error) => {
        this.set(AUTH_SUBJECT.ERROR, err.message);
      });
  }

  public logout() {
    this.firebaseAuth.auth.signOut()
      .then(() => {
        this.cookie.remove(COOKIE.TOKEN);
        this.router.navigateByUrl(ROUTES.AUTH);
      });
  }

  public get(key: keyof IAuthState): ReplaySubject<any> {
    return this.state[key];
  }

  private set(key: keyof IAuthState, value: any): void {
    (<any>this.state[key]).next(value);
  }

  private subscribeToFbaseAuthState(): void {
    this.firebaseAuth.authState.subscribe(async (user: User) => {
      if (!user) {
        this.cookie.remove(COOKIE.TOKEN);
        return;
      }

      const userToken = await user.getIdTokenResult();
      const currentDate = new Date();
      const tokenExpDate = new Date(userToken.expirationTime);

      console.log('currentDate =', currentDate);
      console.log('tokenExpDate =', tokenExpDate);

      if (currentDate < tokenExpDate) {
        // TODO maybe remove this ot move to local storage
        this.cookie.put(COOKIE.TOKEN, userToken.token, { expires: userToken.expirationTime });

        if (this.router.url === '/' + ROUTES.AUTH) {
          this.router.navigateByUrl(ROUTES.DEFAULT);
        }

      } else {
        this.logout();
      }
    });
  }
}
