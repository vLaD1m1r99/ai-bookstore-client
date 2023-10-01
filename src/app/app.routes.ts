import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'signup',
    // Lazy loading...
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.signupRoutes),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.signinRoutes),
  },
];
