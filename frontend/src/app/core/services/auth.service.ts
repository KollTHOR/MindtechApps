import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

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

  login(loginData: any): Observable<any> {
    return this.http
      .post<ILoginApiData>(`${environment.baseUrl}/login`, loginData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((response: ILoginApiData) => {
          if (response.status === 202) {
            this.router.navigate(['/shop']);
            this.setToken(response.token);
            this.setUserName(response.username);
          }
        })
      );
  }
}
