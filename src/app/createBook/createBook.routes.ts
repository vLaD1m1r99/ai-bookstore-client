import { Route } from '@angular/router';
import { CreateBookComponent } from './components/createBook.component';

export const createBookRoutes: Route[] = [
  {
    path: '',
    component: CreateBookComponent,
    data: { title: 'Create book' },
  },
];
