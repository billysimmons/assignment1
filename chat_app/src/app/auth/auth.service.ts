import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  username: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserStorageKey = 'currentUser';
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User | null> {
    const user = { username, password };

    return this.http.post<User | null>(`${this.apiUrl}/login`, user).pipe(
      map((user) => {
        if (user !== null) {
          localStorage.setItem(
            this.currentUserStorageKey,
            JSON.stringify(user)
          );
        }
        return user;
      })
    );
  }

  createUser(
    username: string,
    email: string,
    password: string,
    role: string
  ): Observable<any> {
    const newUser = { username, email, password, role };

    return this.http.post<any>(`${this.apiUrl}/create-user`, newUser);
  }

  updateUser(
    username: string,
    updatedUser: { password: string; role: string }
  ): Observable<any> {
    const updatedUserData = { username, ...updatedUser };

    return this.http.put<any>(
      `${this.apiUrl}/update-user/${username}`,
      updatedUserData
    );
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-user/${username}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-users`);
  }

  getUserData(): Observable<{
    username: string;
    email: string;
    password: string;
    role: string;
  } | null> {
    let loggedInUsername = '';
    const loggedInUserJSON = localStorage.getItem(this.currentUserStorageKey);

    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      loggedInUsername = loggedInUser.username;
    }

    return this.getUsers().pipe(
      map((users) => {
        const userData = users.find(
          (user) => user.username === loggedInUsername
        );

        if (userData) {
          // Check and handle empty email and password
          if (!userData.email) {
            userData.email = 'N/A';
          }

          if (!userData.password) {
            userData.password = 'N/A';
          }
        }

        return userData || null;
      })
    );
  }

  getUserInfo(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-user/${username}`);
  }

  getUsername(): Observable<string | null> {
    return this.getUserData().pipe(
      map((userData) => (userData ? userData.username : null))
    );
  }

  getAllUsers(): Observable<string[]> {
    return this.getUsers().pipe(
      map((users) => users.map((user) => user.username))
    );
  }

  logout() {
    localStorage.removeItem(this.currentUserStorageKey);
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem(this.currentUserStorageKey);
    return !!user;
  }

  isSuperAdmin(): boolean {
    const userJSON = localStorage.getItem(this.currentUserStorageKey);

    if (userJSON) {
      const user = JSON.parse(userJSON);

      if (user && user.role === 'SuperAdmin') {
        return true;
      }
    }

    return false;
  }

  isGroupAdmin(): boolean {
    const userJSON = localStorage.getItem(this.currentUserStorageKey);

    if (userJSON) {
      const user = JSON.parse(userJSON);

      if (user && (user.role === 'SuperAdmin' || user.role == 'GroupAdmin')) {
        return true;
      }
    }

    return false;
  }
}
