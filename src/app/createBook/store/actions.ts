import { createActionGroup, props } from '@ngrx/store';
import { BookInterface } from 'src/app/shared/types/book.interface';

export const createBookActions = createActionGroup({
  source: 'createBook',
  events: {
    'Create book': props<{ request: FormData }>(),
    'Create book success': props<BookInterface>(),
    'Create book failure': props<{ errors: string }>(),
  },
});
