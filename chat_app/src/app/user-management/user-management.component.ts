import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  userList: {
    username: string;
    email: string;
    password: string;
    role: string;
  }[] = [];
  newUsername: string = '';
  newEmail: string = '';
  newPassword: string = '';
  newRole: string = 'User';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserList();
  }

  loadUserList() {
    this.authService.getUsers().subscribe(
      (users) => {
        this.userList = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  createUser() {
    const newUser = {
      username: this.newUsername,
      email: this.newEmail,
      password: this.newPassword,
      role: this.newRole,
    };

    if (newUser.username.length > 0 && newUser.password.length > 0) {
      this.authService
        .createUser(
          newUser.username,
          newUser.email,
          newUser.password,
          newUser.role
        )
        .subscribe(
          (response) => {
            if (response) {
              this.userList.push(newUser);
              this.resetCreateUserForm();
            }
          },
          (error) => {
            console.error('Error creating user:', error);
          }
        );
    }
  }

  resetCreateUserForm() {
    this.newUsername = '';
    this.newEmail = '';
    this.newPassword = '';
    this.newRole = 'User';
  }

  deleteUser(username: string) {
    this.authService.deleteUser(username).subscribe(
      (response) => {
        if (response) {
          const deletedIndex = this.userList.findIndex(
            (user) => user.username === username
          );

          if (deletedIndex !== -1) {
            this.userList.splice(deletedIndex, 1);
          }
        }
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
