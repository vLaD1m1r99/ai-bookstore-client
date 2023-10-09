import { createActionGroup, props } from '@ngrx/store';
import { BookInterface } from 'src/app/shared/types/book.interface';

export const bookActions = createActionGroup({
  source: 'book',
  events: {
    'Set books': props<{ books: BookInterface[] }>(),
    'Add book': props<{ book: BookInterface }>(),
  },
});
