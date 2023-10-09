import { Route } from '@angular/router';
import { FavoriteBooksComponent } from './components/favoriteBooks.component';

export const favoriteBooksRoutes: Route[] = [
  {
    path: '',
    component: FavoriteBooksComponent,
    data: { title: 'Favorite books' },
  },
];
