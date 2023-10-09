import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/shared/types/user.interface';
import { Store } from '@ngrx/store';
import { userActions } from '../store/user/user.actions';
import { Observable, map, of, switchMap } from 'rxjs';
import { BookInterface } from '../types/book.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PersistanceService } from './persistance.service';
import { selectUser } from '../store/user/user.reducers';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private persistanceService: PersistanceService,
    private store: Store
  ) {}

  setUserToStore(user: UserInterface) {
    this.store.dispatch(userActions.setUser({ user }));
  }
  removeUserFromStore(access_token: string) {
    this.store.dispatch(userActions.clearUser({ access_token }));
  }

  getFavoriteBooks(): Observable<BookInterface[] | []> {
    return this.store.select(selectUser).pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const token = this.persistanceService.get('access_token');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        const url = `${environment.apiUrl}/users/${user.id}/books`;
        return this.http.get<BookInterface[] | []>(url, { headers });
      })
    );
  }

  addFavoriteBook(bookId: string): Observable<UserInterface | null> {
    return this.store.select(selectUser).pipe(
      switchMap((user) => {
        if (!user) {
          return of(null);
        }
        const token = this.persistanceService.get('access_token');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        const url = `${environment.apiUrl}/users/${user.id}/books/${bookId}`;
        return this.http.post<UserInterface | null>(url, null, { headers });
      })
    );
  }

  removeFavoriteBook(bookId: string): Observable<UserInterface | null> {
    return this.store.select(selectUser).pipe(
      switchMap((user) => {
        if (!user) {
          return of(null);
        }
        const token = this.persistanceService.get('access_token');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        const url = `${environment.apiUrl}/users/${user.id}/books/${bookId}`;
        return this.http.delete<UserInterface | null>(url, { headers });
      })
    );
  }
}
