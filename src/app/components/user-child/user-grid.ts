import { Component, OnInit, signal } from '@angular/core';
import { User } from '../../models/user';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user';
import { SharingData } from '../../services/sharing-data';

@Component({
  imports: [RouterModule],
  selector: 'app-user-grid',
  templateUrl: './user-grid.html',
})
export class UserGridComponent implements OnInit {

  title: string = 'Listado de usuarios';

  users = signal<User[]>([]);

  constructor(
    private router: Router,
    private userService: UserService,
    private sharingData: SharingData,
  ) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(users => this.users.set(users));
  }

  deleteUser(userId: number): void {
    console.log(`Deleting user with ID: ${userId}`);
    this.sharingData.deleteUserEventEmitter.emit(userId);
  }
  
}
