import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  userList: Array<{
    username: string;
    email: string;
    password: string;
    role: string;
  }> = [];
  newUsername: string = '';
  newEmail: string = '';
  newPassword: string = '';
  newRole: string = 'User';
  selectedUser: {
    username: string;
    email: string;
    password: string;
    role: string;
  } | null = null;
  editedUser: {
    username: string;
    email: string;
    password: string;
    role: string;
  } = {
    username: '',
    email: '',
    password: '',
    role: 'User',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Load the user list from local storage when the component initializes
    this.userList = this.authService.getUsers();
  }

  createUser(username: string, email: string, password: string, role: string) {
    // Create a new user using the AuthService
    const newUser = this.authService.createUser(
      username,
      email,
      password,
      role
    );

    if (newUser) {
      // Update the local user list
      this.userList.push(newUser);

      // Clear the input fields
      this.newUsername = '';
      this.newEmail = '';
      this.newPassword = '';
      this.newRole = 'User';
    }
  }

  editUser(user: {
    username: string;
    email: string;
    password: string;
    role: string;
  }) {
    // Set the selected user for editing
    this.selectedUser = user;

    if (user.username.length > 0 && user.password.length > 0) {
      // Initialize the editedUser object with the selected user's data
      this.editedUser = { ...user };
    }
  }

  saveUserChanges() {
    // Update the user's information using the AuthService
    if (this.selectedUser) {
      const updatedUser = {
        username: this.editedUser.username,
        email: this.editedUser.email,
        password: this.editedUser.password,
        role: this.editedUser.role,
      };

      if (
        this.authService.updateUser(this.selectedUser.username, updatedUser)
      ) {
        // User updated successfully, update the local user list
        const updatedIndex = this.userList.findIndex(
          (user) => user.username === this.selectedUser!.username
        );

        if (updatedIndex !== -1) {
          this.userList[updatedIndex] = updatedUser;
        }

        // Clear the selectedUser and editedUser objects
        this.selectedUser = null;
        this.editedUser = {
          username: '',
          email: '',
          password: '',
          role: 'User',
        };
      } else {
        // Handle the case where the user was not found or the update failed
        // You can display an error message or take other actions as needed
      }
    }
  }

  deleteUser(username: string) {
    if (this.authService.deleteUser(username)) {
      // User deleted successfully, remove from the local user list
      const deletedIndex = this.userList.findIndex(
        (user) => user.username === username
      );

      if (deletedIndex !== -1) {
        this.userList.splice(deletedIndex, 1);
      }
    }
  }
}
