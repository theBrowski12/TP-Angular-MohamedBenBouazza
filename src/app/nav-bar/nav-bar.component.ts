import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { map, Observable, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'navbar',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAdmin: boolean = false;
  private userSub!: Subscription;
  searchQuery: string = '';

  authService = inject(AuthService);
  constructor(private router: Router) {this.isLoggedIn$ = this.authService.currentUser$.pipe(
      map(user => !!user)
    );}

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
get isLoggedIn(): boolean {
    return !!this.authService.currentUser$;
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

  navigateToOrderHistory(): void {
    this.router.navigate(['/order-history']);
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalog'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
      this.searchQuery = ''; // Réinitialise après la recherche
    }
  }
}
