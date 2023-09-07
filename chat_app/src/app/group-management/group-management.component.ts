import { Component } from '@angular/core';
import { GroupService } from '../auth/group.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css'],
})
export class GroupManagementComponent {
  constructor(
    private authService: AuthService,
    private groupService: GroupService
  ) {}

  newName: string = '';
  newMembers: string[] = ['member1', 'member2'];
  newChannels: string[] = ['channel1'];
  newAdmins: string[] = ['admin1', 'admin2'];

  // ngoninit Method to get admins, channels and all members

  // Create new group
  createNewGroup() {
    console.log('triggered from html');

    this.groupService
      .createGroup(
        this.newName,
        this.newMembers,
        this.newChannels,
        this.newAdmins
      )
      .subscribe(
        (response) => {
          console.log('Response:', response);
          // Do something with the response
        },
        (error) => {
          console.error('Error:', error);
          // Handle error
        }
      );
  }

  // Add existing users to group

  // Create channel

  // Add channel to gorup

  // Remove group

  // Remove user from group
}
