import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IUser } from '../../shared/shared.models';
import { User } from 'firebase';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { CookieService } from 'ngx-cookie';

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
              private cookie: CookieService) {
    this.subscribetoFbaseAuthState();
    this.subscribeToUser();
  }

  public login(credentials: IUser): void {
    this.firebaseAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch((err: Error) => {
        this.set(AUTH_SUBJECT.ERROR, err.message);
      });
  }

  public logout() {
    this.firebaseAuth.auth.signOut().then(() => this.cookie.remove('token'));
  }

  public get(key: keyof IAuthState): ReplaySubject<any> {
    return this.state[key];
  }

  private set(key: keyof IAuthState, value: any): void {
    (<any>this.state[key]).next(value);
  }

  private subscribetoFbaseAuthState(): void {
    this.firebaseAuth.authState.subscribe((user: User) => {
      this.set(AUTH_SUBJECT.USER, user);
    });
  }

  private subscribeToUser(): void {
    this.get(AUTH_SUBJECT.USER).subscribe(async (user: User) => {
      if (user) {
        const userToken = await user.getIdTokenResult();
        this.cookie.put('token', userToken.token, {expires: userToken.expirationTime});
      } else {
        this.cookie.remove('token');
      }
    });
  }
}
