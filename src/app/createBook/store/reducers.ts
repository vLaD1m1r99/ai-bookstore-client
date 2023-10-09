import { createFeature, createReducer, on } from '@ngrx/store';
import { createBookActions } from './actions';
import { CreateBookStateInterface } from '../types/createBookState.interface';

const initialState: CreateBookStateInterface = {
  isSubmitting: false,
  isLoading: false,
  validationErrors: null,
  book: null,
};
const createBookFeature = createFeature({
  name: 'createBook',
  reducer: createReducer(
    initialState,
    on(createBookActions.createBook, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(createBookActions.createBookSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      book: action,
    })),
    on(createBookActions.createBookFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }))
  ),
});

export const {
  name: createBookFeatureKey,
  reducer: createBookReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectBook,
  selectValidationErrors,
} = createBookFeature;
