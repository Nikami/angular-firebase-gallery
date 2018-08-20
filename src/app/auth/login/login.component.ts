import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUTH_SUBJECT, AuthService } from '../services/auth.service';
import { IUser } from '../../shared/shared.models';

@Component({
  selector: 'afg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  errorMessage: string = '';

  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  rebuildForm(): void {
    this.form.reset({
      email: '',
      password: ''
    });
    this.pending = false;
  }

  ngOnInit() {
  }

  onSubmit({ value }: { value: IUser }): void {
    this.errorMessage = '';
    this.pending = true;
    this.auth.login(value);
    this.auth.get(AUTH_SUBJECT.ERROR).subscribe((error: string) => {
      this.errorMessage = error;
      this.rebuildForm();
    })
  }

}
