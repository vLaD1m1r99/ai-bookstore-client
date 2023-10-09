import { Route } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

export const signupRoutes: Route[] = [
  {
    path: '',
    component: SignupComponent,
    data: { title: 'Sign up' },
  },
];
export const signinRoutes: Route[] = [
  {
    path: '',
    component: SigninComponent,
    data: { title: 'Sign in' },
  },
];
