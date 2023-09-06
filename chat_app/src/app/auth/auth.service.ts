import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userListStorageKey = 'userList';
  private readonly currentUserStorageKey = 'currentUser';

  // Initialize user list
  initialiseUserList() {
    const userListExists = !!localStorage.getItem(this.userListStorageKey);

    if (!userListExists) {
      const hardcodedUsers = [
        {
          username: 'SuperAdmin-User',
          email: 'superadmin@example.com',
          password: 'password',
          role: 'SuperAdmin',
        },
        {
          username: 'GroupAdmin-User',
          email: 'groupadmin@example.com',
          password: 'password',
          role: 'GroupAdmin',
        },
        {
          username: 'NormalUser-User',
          email: 'normaluser@example.com',
          password: 'password',
          role: 'User',
        },
      ];

      localStorage.setItem(
        this.userListStorageKey,
        JSON.stringify(hardcodedUsers)
      );
    }
  }

  // Authenticate the user
  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    localStorage.setItem(this.currentUserStorageKey, JSON.stringify(user));

    return !!user; // return if user exists
  }

  // Create a new user object
  createUser(username: string, email: string, password: string, role: string) {
    // Retrieve the existing users from local storage
    const existingUsers = this.getUsers();

    // Check if a user with the same username or email already exists
    const userExists = existingUsers.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      // User with the same username or email already exists, don't create a new user
      return null;
    }

    // Create a new user object
    const newUser = {
      username,
      email,
      password,
      role,
    };

    // Add the new user to the existing array
    existingUsers.push(newUser);

    // Store the updated users array in local storage
    localStorage.setItem(
      this.userListStorageKey,
      JSON.stringify(existingUsers)
    );

    return newUser;
  }

  updateUser(
    username: string,
    updatedUser: { password: string; role: string }
  ): boolean {
    // Retrieve the list of users from local storage
    const userList = this.getUsers();

    // Find the user to update based on the username
    const userIndex = userList.findIndex((user) => user.username === username);

    // If the user is found, update their information
    if (userIndex !== -1) {
      userList[userIndex].password = updatedUser.password;
      userList[userIndex].role = updatedUser.role;

      // Save the updated user list to local storage
      localStorage.setItem(this.userListStorageKey, JSON.stringify(userList));

      return true;
    }

    return false; // User not found or update failed
  }

  deleteUser(username: string): boolean {
    // Retrieve the list of users from local storage
    const userList = this.getUsers();

    // Find the user to delete based on the username
    const userIndex = userList.findIndex((user) => user.username === username);

    // If the user is found, remove them from the list
    if (userIndex !== -1) {
      userList.splice(userIndex, 1);

      // Save the updated user list to local storage
      localStorage.setItem(this.userListStorageKey, JSON.stringify(userList));

      return true;
    }

    return false; // User not found or delete failed
  }

  getUserData(): {
    username: string;
    email: string;
    password: string;
    role: string;
  } | null {
    let loggedInUsername = '';
    const loggedInUserJSON = localStorage.getItem(this.currentUserStorageKey);

    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      loggedInUsername = loggedInUser.username;
    }

    // Retrieve the array of users from local storage
    const users = this.getUsers();

    // Find the user in the array based on their username
    const userData = users.find((user) => user.username === loggedInUsername);

    return userData || null;
  }

  // Retrieve the array of users from local storage
  getUsers(): Array<{
    username: string;
    email: string;
    password: string;
    role: string;
  }> {
    const storedUsers = localStorage.getItem(this.userListStorageKey);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  // Add a method to get the username of the current user
  getUsername(): string | null {
    const userData = this.getUserData();
    return userData ? userData.username : null;
  }

  // Add a method to get all users (you may implement this based on your needs)
  getAllUsers(): string[] {
    const users = this.getUsers();
    return users.map((user) => user.username);
  }

  logout() {
    // Clear user data from local storage
    localStorage.removeItem(this.currentUserStorageKey);
  }

  isAuthenticated(): boolean {
    // Check if there is a user data object in local storage
    const user = localStorage.getItem(this.currentUserStorageKey);

    if (user) {
      return true;
    }

    return false;
  }

  isSuperAdmin(): boolean {
    // Check if the user data object has a role of 'SuperAdmin'
    const userJSON = localStorage.getItem(this.currentUserStorageKey);

    if (userJSON) {
      const user = JSON.parse(userJSON);

      if (user && user.role === 'SuperAdmin') {
        return true;
      }
    }

    return false; // Return false if user data is not found or if the role is not 'SuperAdmin'
  }
}
