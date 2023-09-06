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

  // Create new group

  // Add existing users to group

  // Create channel

  // Add channel to gorup

  // Remove group

  // Remove user from group
}
