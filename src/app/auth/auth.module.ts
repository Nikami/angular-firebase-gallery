import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { LoginComponent } from './login/login.component';
import { AuthRouting } from './auth.routing';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule { }
