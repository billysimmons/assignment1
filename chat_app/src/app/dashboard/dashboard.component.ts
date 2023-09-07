import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userRole: string = '';
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Fetch user data when the dashboard component initializes
    this.authService.getUserData().subscribe((userData) => {
      if (userData) {
        this.userRole = userData.role;
        this.username = userData.username;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
