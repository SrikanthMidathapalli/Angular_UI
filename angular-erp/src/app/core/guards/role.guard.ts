import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('User in roleGuard:', user);
    
    if (user && user.role) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
