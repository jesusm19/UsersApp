import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  imports: [],
  selector: 'app-user-grid',
  templateUrl: './user-grid.html',
})
export class UserGridComponent {

  @Input() users: User[] = [];

  @Output() deleteUserEvent = new EventEmitter<number>();

  @Output() editUserEvent = new EventEmitter<number>();

  deleteUser(userId: number): void {
    console.log(`Deleting user with ID: ${userId}`);
    this.deleteUserEvent.emit(userId);
  }
  
  editUser(userId: number): void {
    console.log(`Editing user with ID: ${userId}`);
    this.editUserEvent.emit(userId);
  }
}
