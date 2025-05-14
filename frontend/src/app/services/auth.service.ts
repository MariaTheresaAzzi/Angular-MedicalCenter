import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signUp(username: string, email: string, password: string) {
    const body = { username, email, password };
    return this.http.post('http://localhost:3000/api/signup', body);
  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<{token: string}>('http://localhost:3000/api/signin', body);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
