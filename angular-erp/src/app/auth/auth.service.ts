import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiBase = environment.apiBaseUrl;
  private adminUrl = `${this.apiBase}${environment.endpoints.admins}`;
  private employeeUrl = `${this.apiBase}${environment.endpoints.employees}`;
  private isAuthenticated = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.adminUrl}?email=${email}&password=${password}`).pipe(
      switchMap(admins => {
        if (admins.length > 0) {
          this.storeUser(admins[0], 'admin'); 
          return new BehaviorSubject(admins[0]).asObservable(); 
        }
        return this.http.get<any[]>(`${this.employeeUrl}?email=${email}&password=${password}`).pipe(
          map(employees => {
            if (employees.length > 0) {
              this.storeUser(employees[0], 'employee'); 
              return employees[0];
            }
            return null; 
          })
        );
      })
    );
  }

  private storeUser(user: any, role: string) {
    user.role = role.toLowerCase();
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated.next(true);
  }

  logout() {
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.getValue();
  }

  getUserRole(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : '';
  }

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('user');
  }
}
