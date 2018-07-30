import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    pathMatch: 'full',
    component: LoginComponent
  }
];

export const AuthRouting = RouterModule.forChild(routes);
