import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { OnInit } from '@angular/core';
import { UserGridComponent } from "../user-child/user-grid";
import { UserFormComponent } from "../user-form/user-form";

@Component({
  imports: [UserGridComponent, UserFormComponent],
  selector: 'user-app',
  templateUrl: './user-app.html',
})
export class UserAppComponent implements OnInit {

  title: string = 'Listado de usuarios';

  users: User[] = [];
  userSelected: User;

  constructor(private userService: UserService) {
    this.userSelected = new User(0, '', '', '','','');
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(users => this.users = users);
  } 
  
  addUser(user: User): void {
    this.userSelected = new User(0, '', '', '','','');
    if (user && user.id != 0) { 
      console.log(`Updating user: ${JSON.stringify(user)}`);
      this.users = this.users.map(u => u.id === user.id ? {...user} : u);
      return;
    }
    this.users = [...this.users, {... user}];

  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  editUser(userId: number): void {
    this.userSelected = {... this.users.find(user => user.id === userId) ?? this.userSelected};
  }


}
