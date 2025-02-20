import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password are required';
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      user => {
        console.log('User after login:', user); 
this.user=user;
        if (user) {
          const role = user.role?.toLowerCase(); 
          console.log('Redirecting to:', role); 

          // Redirect based on role
          if (role === 'admin') {
            this.router.navigate(['/admin/employees']);
          } else if (role === 'employee') {
            this.router.navigate(['/employee/profile']);
          } else {
            this.errorMessage = 'Invalid role';
          }
        } else {
          this.errorMessage = 'Invalid email or password';
        }
      },
      error => {
        this.errorMessage = 'Something went wrong. Please try again.';
        console.error(error);
      }
    );
  }
}
