import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookInterface } from '../types/book.interface';
import { PersistanceService } from './persistance.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(
    private http: HttpClient,
    private persistanceService: PersistanceService
  ) {}

  createBook(data: FormData): Observable<BookInterface> {
    const token = this.persistanceService.get('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${environment.apiUrl}/books`;
    return this.http
      .post<BookInterface>(url, data, { headers })
      .pipe(map((response) => response));
  }

  getBooks(): Observable<BookInterface[] | []> {
    const url = `${environment.apiUrl}/books`;
    return this.http
      .get<BookInterface[]>(url)
      .pipe(map((response) => response));
  }

  getBook(id: string): Observable<BookInterface | null> {
    const url = `${environment.apiUrl}/books/${id}`;
    return this.http
      .get<BookInterface | null>(url)
      .pipe(map((response) => response));
  }
}
