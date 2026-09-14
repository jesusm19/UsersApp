import { Component, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user';
import { SharingData } from '../../services/sharing-data';

@Component({
  imports: [RouterModule],
  selector: 'app-user-grid',
  templateUrl: './user-grid.html',
})
export class UserGridComponent {

  title: string = 'Listado de usuarios';

  users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private sharingData: SharingData,
  ) {
    //this.users = this.router.getCurrentNavigation()?.extras.state?.['users'] || [];
    if (this.router.currentNavigation()?.extras.state?.['users']) {
      this.users = this.router.currentNavigation()?.extras.state?.['users'] || [];
    } else {
      this.userService.findAll().subscribe(users => this.users = users);
    }
  }

  deleteUser(userId: number): void {
    console.log(`Deleting user with ID: ${userId}`);
    this.sharingData.deleteUserEventEmitter.emit(userId);
  }
  
}
