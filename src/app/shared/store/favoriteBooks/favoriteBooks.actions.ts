import { createActionGroup, props } from '@ngrx/store';
import { BookInterface } from 'src/app/shared/types/book.interface';

export const favoriteBooksActions = createActionGroup({
  source: 'favoriteBooks',
  events: {
    'Set books': props<{ books: BookInterface[] }>(),
    'Add book': props<{ book: BookInterface }>(),
  },
});
