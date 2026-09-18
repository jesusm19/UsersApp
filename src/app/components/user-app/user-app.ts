import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user';

import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar';
import { SharingData } from '../../services/sharing-data';

@Component({
  imports: [RouterOutlet, NavbarComponent],
  selector: 'user-app',
  styleUrls: ['./user-app.css'],
  templateUrl: './user-app.html',
})
export class UserAppComponent implements OnInit {

  users: User[] = [];


  constructor(
    private sharingData: SharingData,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(users => this.users = users);
    this.addUser();
    this.deleteUser();
    this.findUserById();
  } 
  
  addUser(): void {
    this.sharingData.userEventEmmiter.subscribe((user: User) => {
      if (user && user.id != 0) { 
        console.log(`Updating user: ${JSON.stringify(user)}`);
        this.users = this.users.map(u => u.id === user.id ? {...user} : u);
        this.confirmAddUser();
        return;
      } 
  
      this.users = [...this.users, {... user}];
      this.confirmAddUser();
    });

  }

  deleteUser(): void {
    this.sharingData.deleteUserEventEmitter.subscribe((userId: number) => {
      Swal.fire({
        title: "Estas seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, bórralo!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.users = this.users.filter(user => user.id !== userId);
          this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users'], {state: {users: this.users}});
          });
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu archivo ha sido eliminado.",
            icon: "success"
          });
        }
      });
    });

    
  }

  findUserById(){
    this.sharingData.findUserByIdEventEmitter.subscribe((userId: number) => {
      const user = this.users.find(u => u.id === userId);
      if (user) {
        console.log(`Found user by ID: ${JSON.stringify(user)}`);
        this.sharingData.selectedUserEventEmitter.emit(user);
      }
    });
  }

  confirmAddUser(): void {
    this.router.navigate(['/users'], {state: {users: this.users}});
    Swal.fire({
    title: "Guardado!",
    text: "¡El usuario ha sido guardado correctamente!",
    icon: "success"
    });

  }

}
