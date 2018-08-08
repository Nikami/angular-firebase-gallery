import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ROUTES } from '../app.config';

const routes: Routes = [
  {
    path: ROUTES.AUTH,
    pathMatch: 'full',
    component: LoginComponent
  }
];

export const AuthRouting = RouterModule.forChild(routes);
