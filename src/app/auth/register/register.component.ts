import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  role = 'user';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (!this.username || !this.password) {
      alert('Username and password are required');
      return;
    }

    this.authService
      .register({ username: this.username, password: this.password, role: this.role })
      .subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          alert('Registration failed. Try again with another username.');
        }
      });
  }
}
