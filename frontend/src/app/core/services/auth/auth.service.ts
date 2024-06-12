import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import type { IApiRespMessageModel } from '../../models/IApiRespMessageModel';
import type { IRegisterUser } from '../../models/IRegisterUser';
import { ILoginUser } from '../../models/ILoginUser';
import { ILoginApiData } from '../../models/ILoginApiData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  getToken(): string {
    return localStorage.getItem('token') as string;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUserName(): string {
    return localStorage.getItem('user') as string;
  }

  setUserName(userName: string): void {
    localStorage.setItem('user', userName);
  }

  login(loginData: ILoginUser): Observable<ILoginApiData> {
    return this.http
      .post<ILoginApiData>(`${environment.baseUrl}/login`, loginData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((response: ILoginApiData) => {
          if (response.status === 202) {
            this.isAuthenticatedSubject.next(true);
            this.router.navigate(['/pokemons']);
            this.setToken(response.token);
            this.setUserName(response.username);
          }
        })
      );
  }

  register(registerData: IRegisterUser): Observable<IApiRespMessageModel> {
    return this.http
      .post<IApiRespMessageModel>(
        `${environment.baseUrl}/register`,
        registerData,
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap((response: any) => {
          if (response.status === 202) {
            this.router.navigate(['/login']);
          }
        })
      );
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  logout(): void {
    this.clearLocalStorage();
    this.router.navigate(['/login']);
    this.isAuthenticatedSubject.next(false);
  }

  checkLocalStorageData(): void {
    if (!this.getToken() || !this.getUserName()) {
      this.logout();
    }
  }

  monitorLocalStorageChanges(): void {
    window.addEventListener('storage', () => {
      this.logout();
    });
  }

  isTokenValid(): boolean {
    const token: string = this.getToken();
    if (!token) {
      return false;
    }

    const tokenPayload: any = jwtDecode(token);

    if (Date.now() > tokenPayload.exp * 1000) {
      this.logout();
      return false;
    }
    return true;
  }

  isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
