import { createFeature, createReducer, on } from '@ngrx/store';
import { bookActions } from './book.actions';
import { BookStateInterface } from '../../types/bookState.interface';

const initialState: BookStateInterface = {
  books: [],
};

const bookFeature = createFeature({
  name: 'book',
  reducer: createReducer(
    initialState,
    on(bookActions.setBooks, (state, { books }) => ({ ...state, books })),
    on(bookActions.addBook, (state, { book }) => ({
      ...state,
      books: [...state.books, book],
    }))
  ),
});

export const {
  name: bookFeatureKey,
  reducer: bookReducer,
  selectBooks,
} = bookFeature;
