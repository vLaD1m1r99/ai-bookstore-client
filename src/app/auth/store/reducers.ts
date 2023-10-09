import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  validationErrors: null,
  accessToken: null,
};
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.signup, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.signin, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.authSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      accessToken: action.access_token,
    })),
    on(authActions.authFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectAccessToken,
  selectValidationErrors,
} = authFeature;
