import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (user) => {
        if (user !== null) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Invalid username or password';
        }
      },
      (error) => {
        console.error('Error logging in:', error);
      }
    );
  }
}
