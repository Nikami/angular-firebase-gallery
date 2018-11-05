import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CookieService } from 'ngx-cookie';
import { COOKIE } from '../../app.config';
import { Subject } from 'rxjs/internal/Subject';
import { timer } from 'rxjs/internal/observable/timer';
import { first, switchMap, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SessionDialogComponent } from '../../shared/components/session-dialog/session-dialog.component';
import { ONE_MINUTE_MS } from '../../shared/pipes/ms-to-time.pipe';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { fromPromise } from 'rxjs/internal-compatibility';
import IdTokenResult = firebase.auth.IdTokenResult;
import { AUTH_SUBJECT, AuthService } from '../../auth/services/auth.service';

@Injectable()
export class SessionExpirationService {
  private sessionExpiration$: Subject<number> = new Subject();
  private sessionExpirationSubscription: Subscription;

  constructor(private cookie: CookieService,
              private dialog: MatDialog,
              private firebaseAuth: AngularFireAuth,
              private auth: AuthService) {
  }

  public init(): void {
    this.subscribeToSessionExpiration();
    this.subscribeToAuthSession();
    this.setSessionExpiration(this.cookie.get(COOKIE.SESSION));
  }

  private setSessionExpiration(session: string): void {
    if (session) {
      const expDateMs: number = new Date(session).getTime();
      const currDateMs: number = new Date().getTime();
      this.sessionExpiration$.next(expDateMs - currDateMs);
    } else {
      this.sessionExpiration$.next(null);
    }
  }

  private refreshToken(): void {
    this.firebaseAuth.user.pipe(
      first(),
      switchMap((user: User) => fromPromise(user.getIdTokenResult(true))),
      tap((uToken: IdTokenResult) => {
        this.cookie.put(COOKIE.TOKEN, uToken.token, { expires: uToken.expirationTime });
        this.cookie.put(COOKIE.SESSION, uToken.expirationTime, { expires: uToken.expirationTime });
        this.setSessionExpiration(this.cookie.get(COOKIE.SESSION));
      })
    ).subscribe();
  }

  private subscribeToAuthSession(): void {
    // TODO: mb make this one with cookie session
    this.auth.get(AUTH_SUBJECT.SESSION).subscribe((session: string) => this.setSessionExpiration(session));
  }

  private subscribeToSessionExpiration(): void {
    this.sessionExpirationSubscription = this.sessionExpiration$.pipe(
      tap((expMs: number) => {
        if (expMs !== null) {
          timer(expMs - ONE_MINUTE_MS).subscribe(() => this.openSessionExpirationModal());
        }
      })
    ).subscribe();
  }

  private openSessionExpirationModal(): void {
    this.dialog.closeAll();
    const dialogRef: MatDialogRef<SessionDialogComponent> = this.dialog.open(SessionDialogComponent, {
      maxWidth: '350px',
      panelClass: 'dialog-accent',
      data: {
        ms: ONE_MINUTE_MS
      }
    });

    dialogRef.afterClosed().subscribe((isSessionProlongAccepted: boolean) => {
      if (isSessionProlongAccepted) {
        this.refreshToken();
      } else {
        this.auth.logout();
      }
    });
  }
}
