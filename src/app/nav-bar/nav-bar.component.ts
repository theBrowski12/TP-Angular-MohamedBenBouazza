import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router) {}

  navigateToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
