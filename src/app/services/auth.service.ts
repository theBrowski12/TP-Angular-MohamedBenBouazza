import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenKey = 'auth_token';
  private roleKey = 'user_role';
  private usernameKey = 'username';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public currentUser$ = new BehaviorSubject<{ username: string; role: string } | null>(this.getUser());

  constructor(private http: HttpClient) {}

  register(data: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    const username = payload.username;
    const role = payload.role.toLowerCase(); // Ensure lowercase

    localStorage.setItem(this.usernameKey, username);
    localStorage.setItem(this.roleKey, role);

    // Emit new values
    this.loggedIn.next(true);
    this.currentUser$.next({ username, role });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }
  
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.usernameKey);

    this.loggedIn.next(false);
    this.currentUser$.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
isAdmin(): boolean {
    const role = this.getRole();
    return role ? role.toLowerCase() === 'admin' : false;
  }
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  private getUser(): { username: string; role: string } | null {
    const username = localStorage.getItem(this.usernameKey);
    const role = localStorage.getItem(this.roleKey);
    return username && role ? { username, role } : null;
  }
}
