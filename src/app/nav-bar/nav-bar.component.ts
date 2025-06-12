import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  isAdmin: boolean = false;
  private userSub!: Subscription;

  authService = inject(AuthService);
  constructor(private router: Router) {}

  ngOnInit() {
    // Initial check
    this.checkAdminStatus();
    
    // Subscribe to future changes
    this.userSub = this.authService.currentUser$.subscribe(() => {
      this.checkAdminStatus();
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


  private checkAdminStatus() {
  this.isAdmin = this.authService.getRole()?.toLowerCase() === 'admin';
}

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
  navigateToAddProduct(): void {
    this.router.navigate(['/add-product']); }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  
}
