import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.services';
import { createBookActions } from './actions';
import { BookService } from 'src/app/shared/services/book.service';
import { BookInterface } from 'src/app/shared/types/book.interface';
import { bookActions } from 'src/app/shared/store/books/book.actions';
import { favoriteBooksActions } from 'src/app/shared/store/favoriteBooks/favoriteBooks.actions';

export const createBookEffect = createEffect(
  (actions$ = inject(Actions), bookService = inject(BookService)) => {
    return actions$.pipe(
      ofType(createBookActions.createBook),
      switchMap(({ request }) =>
        bookService.createBook(request).pipe(
          map((response: BookInterface) => {
            bookActions.addBook({ book: response });
            favoriteBooksActions.addBook({ book: response });
            // Returning success
            return createBookActions.createBookSuccess(response);
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              createBookActions.createBookFailure({
                errors: errorResponse.error.message,
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);
