import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Group {
  id: string;
  name: string;
  members: string[];
  channels: string[];
  admin: string;
}

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly apiUrl = 'http://localhost:3000/groups';

  constructor(private http: HttpClient) {}

  // Create a new group
  createGroup(
    groupName: string,
    adminUsername: string
  ): Observable<Group | null> {
    return this.http.post<Group | null>(`${this.apiUrl}`, {
      name: groupName,
      admin: adminUsername,
    });
  }

  // Add a user to a group
  addUserToGroup(username: string, groupId: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${groupId}/addUser`, {
      username,
    });
  }

  // Remove a user from a group
  removeUserFromGroup(username: string, groupId: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${groupId}/removeUser`, {
      username,
    });
  }

  // Create a channel in a group
  createChannel(groupId: string, channelName: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${groupId}/channels`, {
      name: channelName,
    });
  }

  // Add a user to a channel
  addUserToChannel(
    groupId: string,
    channelId: string,
    username: string
  ): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.apiUrl}/${groupId}/channels/${channelId}/addUser`,
      { username }
    );
  }

  // Remove a user from a channel
  removeUserFromChannel(
    groupId: string,
    channelId: string,
    username: string
  ): Observable<boolean> {
    return this.http.put<boolean>(
      `${this.apiUrl}/${groupId}/channels/${channelId}/removeUser`,
      { username }
    );
  }

  // Remove a group
  removeGroup(groupId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${groupId}`);
  }

  // Get all groups
  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}`);
  }

  // Get a specific group
  getGroup(groupId: string): Observable<Group | null> {
    return this.http.get<Group | null>(`${this.apiUrl}/${groupId}`);
  }
}
