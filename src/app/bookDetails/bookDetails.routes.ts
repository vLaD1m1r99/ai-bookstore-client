import { Route } from '@angular/router';
import { BookDetailsComponent } from './components/bookDetails.component';

export const bookDetailsRoutes: Route[] = [
  {
    path: '',
    component: BookDetailsComponent,
    data: { title: 'Book details' },
  },
];
