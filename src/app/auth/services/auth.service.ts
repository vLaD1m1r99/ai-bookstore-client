import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserInterface } from 'src/app/shared/types/user.interface';
import { environment } from '../../../environments/environment';
import { SigninRequestInterface } from '../types/signinRequest.interface';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/shared/services/user.services';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private persistanceService: PersistanceService,
    private userService: UserService
  ) {}
  signup(data: FormData): Observable<{ access_token: string }> {
    const url = `${environment.apiUrl}/auth/register`;
    return this.http
      .post<{ access_token: string }>(url, data)
      .pipe(map((response) => response));
  }
  signin(data: SigninRequestInterface): Observable<{ access_token: string }> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http
      .post<{ access_token: string }>(url, data)
      .pipe(map((response) => response));
  }
  signout(): void {
    const token = this.persistanceService.get('access_token');
    if (typeof token === 'string') {
      this.userService.removeUserFromStore(token);
      this.persistanceService.remove('access_token');
    }
  }
  getUserFromToken(): UserInterface | null {
    const token = this.persistanceService.get('access_token');
    if (typeof token === 'string') {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }
}
