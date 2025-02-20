import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  
  // Admin Routes
  { path: 'admin/employees', loadComponent: () => import('./features/admin/employees/employees.component').then(m => m.EmployeesComponent), canActivate: [roleGuard] },
  { path: 'admin/settings', loadComponent: () => import('./features/admin/settings/settings.component').then(m => m.SettingsComponent), canActivate: [roleGuard] },

  // Employee Routes
  { 
    path: 'employee/profile', 
    loadComponent: () => import('./features/employee/profile/profile.component')
      .then(m => m.ProfileComponent), 
    canActivate: [roleGuard] 
  },

  { path: '**', loadComponent: () => import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
