import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { authActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { UserService } from 'src/app/shared/services/user.services';

export const signupEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
    userService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(authActions.signup),
      switchMap(({ request }) =>
        authService.signup(request).pipe(
          map((response: { access_token: string }) => {
            persistanceService.set('access_token', response.access_token);
            const user = authService.getUserFromToken();
            if (user) userService.setUserToStore(user);
            return authActions.authSuccess({
              access_token: response.access_token,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(authActions.authFailure({ errors: errorResponse.error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const signinEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService),
    userService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(authActions.signin),
      switchMap(({ request }) =>
        authService.signin(request).pipe(
          map((response: { access_token: string }) => {
            // Adding access_token
            persistanceService.set('access_token', response.access_token);
            // Adding user to state
            const user = authService.getUserFromToken();
            if (user) userService.setUserToStore(user);
            // Returning success
            return authActions.authSuccess({
              access_token: response.access_token,
            });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(authActions.authFailure({ errors: errorResponse.error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);
