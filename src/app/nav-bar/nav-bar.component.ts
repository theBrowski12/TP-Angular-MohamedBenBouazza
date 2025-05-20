import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  authService = inject(AuthService);
  constructor(private router: Router) {}

  navigateToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
