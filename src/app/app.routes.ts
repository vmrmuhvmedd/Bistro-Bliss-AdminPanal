import { RegisterComponent } from './register/register.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';

export const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent,
  },
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent,
  },
  {
    path : 'home',
    component : NavComponent
  }
];
