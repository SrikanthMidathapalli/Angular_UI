import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'admin/employees', loadComponent: () => import('./features/admin/employees/employees.component').then(m => m.EmployeesComponent) },
  { path: 'admin/settings', loadComponent: () => import('./features/admin/settings/settings.component').then(m => m.SettingsComponent)},
  { path: 'employee/profile', loadComponent: () => import('./features/employee/profile/profile.component').then(m => m.ProfileComponent) },
  { path: '**', loadComponent: () => import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent) },
];

