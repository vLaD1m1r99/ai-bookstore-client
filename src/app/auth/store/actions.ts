import { createActionGroup, props } from '@ngrx/store';
import { SigninRequestInterface } from '../types/signinRequest.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Signup: props<{ request: FormData }>(),
    Signin: props<{ request: SigninRequestInterface }>(),
    'Auth success': props<{ access_token: string }>(),
    'Auth failure': props<{ errors: string }>(),
  },
});
