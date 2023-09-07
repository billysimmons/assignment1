// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app/auth/auth.service'; // Import the AuthService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  // Create a method to check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  isSuperAdmin() {
    return this.authService.isSuperAdmin();
  }
}
