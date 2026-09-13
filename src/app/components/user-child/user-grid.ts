import { Component, EventEmitter } from '@angular/core';
import { User } from '../../models/user';
import { RouterModule, Router } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-user-grid',
  templateUrl: './user-grid.html',
})
export class UserGridComponent {

  title: string = 'Listado de usuarios';

  users: User[] = [];

  deleteUserEvent = new EventEmitter<number>();

  editUserEvent = new EventEmitter<number>();

  constructor(private router: Router) {
    //this.users = this.router.getCurrentNavigation()?.extras.state?.['users'] || [];
    this.users = this.router.currentNavigation()?.extras.state?.['users'] || [];
  }

  deleteUser(userId: number): void {
    console.log(`Deleting user with ID: ${userId}`);
    this.deleteUserEvent.emit(userId);
  }
  
  editUser(userId: number): void {
    console.log(`Editing user with ID: ${userId}`);
    this.editUserEvent.emit(userId);
  }
}
