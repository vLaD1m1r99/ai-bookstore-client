import { Route } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

export const signupRoutes: Route[] = [
  {
    path: '',
    component: SignupComponent,
  },
  {
    path: '',
    component: SigninComponent,
  },
];
export const signinRoutes: Route[] = [
  {
    path: '',
    component: SigninComponent,
  },
];
