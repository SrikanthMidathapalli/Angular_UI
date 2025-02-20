import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { Employee } from '../models/employee';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiBase = environment.apiBaseUrl;
  private endpoints = environment.endpoints;

  constructor(private http: HttpClient) {}

  // ✅ Admin Services
  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiBase}${this.endpoints.admins}`);
  }

  createAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiBase}${this.endpoints.admins}`, admin);
  }

  updateAdmin(admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiBase}${this.endpoints.admins}/${admin.id}`, admin);
  }

  deleteAdmin(adminId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}${this.endpoints.admins}/${adminId}`);
  }

  // ✅ Employee Services
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiBase}${this.endpoints.employees}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiBase}${this.endpoints.employees}`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiBase}${this.endpoints.employees}/${employee.id}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}${this.endpoints.employees}/${employeeId}`);
  }
}
