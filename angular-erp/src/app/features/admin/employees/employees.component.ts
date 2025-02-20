import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { Admin } from '../../../core/models/admin';
import { Employee } from '../../../core/models/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  loginUser = "";
  employees: Employee[] = [];
  admins: Admin[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.getAdmins();
    this.getEmployees();
  }

  /** Fetch all admins */
  getAdmins() {
    this.adminService.getAdmins().subscribe({
      next: (data: Admin[]) => {
        this.admins = data;
      },
      error: (err) => console.error("Error fetching admins:", err)
    });
  }

  /** Fetch all employees */
  getEmployees() {
    this.adminService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
      },
      error: (err) => console.error("Error fetching employees:", err)
    });
  }

  /** Add a new admin */
  addAdmin(admin: Admin) {
    this.adminService.createAdmin(admin).subscribe({
      next: () => {
        this.getAdmins(); // Refresh admin list
        this.router.navigate(['/admin/employees']); 
      },
      error: (err) => console.error("Error adding admin:", err)
    });
  }

  /** Delete an admin */
  deleteAdmin(adminId: number) {
    this.adminService.deleteAdmin(adminId).subscribe({
      next: () => {
        this.getAdmins(); // Refresh the list after deletion
      },
      error: (err) => console.error("Error deleting admin:", err)
    });
  }

  /** Add an employee */
  addEmployee(employee: Employee) {
    this.adminService.createEmployee(employee).subscribe({
      next: () => {
        this.getEmployees(); // Refresh employee list
      },
      error: (err) => console.error("Error adding employee:", err)
    });
  }

  /** Delete an employee */
  deleteEmployee(employeeId: number) {
    this.adminService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.getEmployees(); // Refresh the list after deletion
      },
      error: (err) => console.error("Error deleting employee:", err)
    });
  }
}
