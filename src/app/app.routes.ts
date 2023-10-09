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
  {
    path: 'settings',
    loadChildren: () =>
      import('src/app/settings/settings.routes').then((m) => m.settingsRoutes),
  },
  {
    path: 'createBook',
    loadChildren: () =>
      import('src/app/createBook/createBook.routes').then(
        (m) => m.createBookRoutes
      ),
  },
  {
    path: 'favoriteBooks',
    loadChildren: () =>
      import('src/app/favoriteBooks/favoriteBooks.routes').then(
        (m) => m.favoriteBooksRoutes
      ),
  },
  {
    path: 'book/:id',
    loadChildren: () =>
      import('src/app/bookDetails/bookDetails.routes').then(
        (m) => m.bookDetailsRoutes
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/home/home.routes').then((m) => m.homeRoutes),
  },
];
