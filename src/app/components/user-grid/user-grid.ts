import { Component, OnInit, signal } from '@angular/core';
import { User } from '../../models/user';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const page = Number(params.get('page')) || 0;
      this.userService.findAllPageable(page).subscribe(pagable => this.users.set(pagable.content as User[]));
    });
  }

  deleteUser(userId: number): void {
    console.log(`Deleting user with ID: ${userId}`);
    this.sharingData.deleteUserEventEmitter.emit(userId);
  }
  
}
