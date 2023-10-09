import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersistanceService } from './persistance.service';
import { RatingInterface } from '../types/rating.interface';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(
    private http: HttpClient,
    private persistanceService: PersistanceService
  ) {}

  addRating(data: {
    user: string;
    book: string;
    value: number;
  }): Observable<RatingInterface> {
    const token = this.persistanceService.get('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${environment.apiUrl}/ratings`;
    return this.http
      .post<RatingInterface>(url, data, { headers })
      .pipe(map((response) => response));
  }
  updateRating(id: string, value: number): Observable<RatingInterface> {
    const token = this.persistanceService.get('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${environment.apiUrl}/ratings/${id}`;
    return this.http
      .patch<RatingInterface>(url, { value: value }, { headers })
      .pipe(map((response) => response));
  }

  getRating({
    userId,
    bookId,
  }: {
    userId: string;
    bookId: string;
  }): Observable<RatingInterface | null> {
    const token = this.persistanceService.get('access_token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const url = `${environment.apiUrl}/ratings/${userId}/${bookId}`;
    return this.http
      .get<RatingInterface | null>(url, { headers })
      .pipe(map((response) => response));
  }
}
