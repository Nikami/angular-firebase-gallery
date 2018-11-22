import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AUTH_SUBJECT, AuthService } from '../services/auth.service';
import { IUser } from '../../shared/shared.models';
import {
  Spinner,
  SpinnerService
} from '../../spinner/services/spinner.service';

@Component({
  selector: 'afg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public errorMessage: string = '';
  public form: FormGroup;
  public spinner: Spinner;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private spinnerService: SpinnerService
  ) {
    this.createForm();
    this.spinner = this.spinnerService.create();
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

  onSubmit({ value }: { value: IUser }): void {
    this.errorMessage = '';
    this.pending = true;
    this.spinner.run();
    this.auth.login(value);
    this.auth.get(AUTH_SUBJECT.ERROR).subscribe((error: string) => {
      this.spinner.stop();
      this.errorMessage = error;
      this.rebuildForm();
    });
  }
}
