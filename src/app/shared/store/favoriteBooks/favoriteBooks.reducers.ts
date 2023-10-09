import { createFeature, createReducer, on } from '@ngrx/store';
import { favoriteBooksActions } from './favoriteBooks.actions';
import { BookStateInterface } from 'src/app/shared/types/bookState.interface';

const initialState: BookStateInterface = {
  books: [],
};

const favoriteBooksFeature = createFeature({
  name: 'favoriteBooks',
  reducer: createReducer(
    initialState,
    on(favoriteBooksActions.setBooks, (state, { books }) => ({
      ...state,
      books,
    })),
    on(favoriteBooksActions.addBook, (state, { book }) => ({
      ...state,
      books: [...state.books, book],
    }))
  ),
});

export const {
  name: favoriteBooksFeatureKey,
  reducer: favoriteBooksReducer,
  selectBooks,
} = favoriteBooksFeature;
