import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import {
  userFeatureKey,
  userReducer,
} from './app/shared/store/user/user.reducers';
import {
  createBookFeatureKey,
  createBookReducer,
} from './app/createBook/store/reducers';
import { provideHttpClient } from '@angular/common/http';
import * as authEffect from './app/auth/store/effects';
import { provideEffects } from '@ngrx/effects';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import {
  bookFeatureKey,
  bookReducer,
} from './app/shared/store/books/book.reducer';
import {
  favoriteBooksFeatureKey,
  favoriteBooksReducer,
} from './app/shared/store/favoriteBooks/favoriteBooks.reducers';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(userFeatureKey, userReducer),
    provideState(createBookFeatureKey, createBookReducer),
    provideState(bookFeatureKey, bookReducer),
    provideState(favoriteBooksFeatureKey, favoriteBooksReducer),
    provideEffects(authEffect),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
});
