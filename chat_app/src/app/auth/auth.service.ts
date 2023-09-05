// auth.service.ts

import { Injectable } from '@angular/core';
import { UserRoles } from '../../shared/user-roles';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'userData';

  hardCodedUsers = [
    {
      username: 'SuperAdmin-User',
      password: 'password',
      role: UserRoles.SuperAdmin,
    },
    {
      username: 'GroupAdmin-User',
      password: 'password',
      role: UserRoles.GroupAdmin,
    },
    {
      username: 'NormalUser-User',
      password: 'password',
      role: UserRoles.User,
    },
  ];

  login(username: string, password: string) {
    // Find the user with the provided username and password
    const user = this.hardCodedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Store user data in local storage
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout() {
    // Clear user data from local storage
    localStorage.removeItem(this.storageKey);
  }

  getUserData() {
    // Retrieve user data from local storage
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return this.getUserData() !== null; // Checks if getUserData return a non-null value which indicates that the user is authenticated
  }

  isSuperAdmin(): boolean {
    const userData = this.getUserData();
    return userData?.role === UserRoles.SuperAdmin;
  }
}
