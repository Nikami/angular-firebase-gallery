import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router) {
    this.user = firebaseAuth.authState;
  }
}
