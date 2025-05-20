import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        const token = res.token;
        this.authService.setToken(token);
        this.errorMessage = '';
        this.router.navigate(['/catalog']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}
