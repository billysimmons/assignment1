import { Component, OnInit } from '@angular/core';
import { GroupService } from '../auth/group.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css'],
})
export class GroupManagementComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private groupService: GroupService
  ) {}

  groupsList: any[] = [];
  usersList: any[] = [];
  adminsList: object[] = [];
  newName: string = '';
  newMembers: string[] = [];
  newChannels: string[] = ['channel1'];
  newAdmins: string[] = ['admin1', 'admin2'];
  selectedGroupId: string = ''; // Track the selected group ID

  selectedUsers: any[] = [];

  ngOnInit() {
    this.getUserList();
    this.getGroupsList();
  }

  getGroupsList() {
    this.groupService.getGroups().subscribe(
      (groups) => {
        this.groupsList = groups;
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  getUserList() {
    this.authService.getUsers().subscribe(
      (users) => {
        this.adminsList = users.filter(
          (user) => user.role === 'GroupAdmin' || user.role === 'SuperAdmin'
        );

        this.usersList = users.filter((user) => user.role === 'User');
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  createNewGroup() {
    this.groupService
      .createGroup(
        this.newName,
        this.newMembers,
        this.newChannels,
        this.newAdmins
      )
      .subscribe(
        (response) => {
          // Refresh the list of groups after adding a new one
          this.getGroupsList();

          // Optionally, reset form fields after successful creation
          this.newName = '';
          this.newMembers = [];
          this.newChannels = ['channel1'];
          this.newAdmins = [];
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  onUserSelectChange(event: Event) {
    const selectedUser = (event.target as HTMLSelectElement).value.split(
      "'"
    )[1];

    if (selectedUser && !this.selectedUsers.includes(selectedUser)) {
      this.selectedUsers.push(selectedUser);
    }

    console.log(this.selectedUsers);
  }

  addUserToGroup() {
    if (!this.selectedGroupId || this.selectedUsers.length === 0) {
      console.error('Please select a group and user(s) first.');
      return;
    }

    this.groupService
      .addUserToGroup(this.selectedGroupId, this.selectedUsers)
      .subscribe(
        (response) => {
          // Optionally, reset form fields after successful addition
          this.selectedUsers = [];
          this.selectedGroupId = '';
        },
        (error) => {
          console.error('Error adding user to group:', error);
        }
      );
  }
}
