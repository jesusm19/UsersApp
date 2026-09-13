import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { OnInit } from '@angular/core';
import { UserGridComponent } from "../user-child/user-grid";
import { UserFormComponent } from "../user-form/user-form";
import Swal from 'sweetalert2';

@Component({
  imports: [UserGridComponent, UserFormComponent],
  selector: 'user-app',
  styleUrls: ['./user-app.css'],
  templateUrl: './user-app.html',
})
export class UserAppComponent implements OnInit {

  title: string = 'Listado de usuarios';

  users: User[] = [];
  userSelected: User;

  isOpenForm: boolean = false;

  constructor(private userService: UserService) {
    this.userSelected = new User(0, '', '', '','','');
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(users => this.users = users);
  } 
  
  addUser(user: User): void {
    
    if (user && user.id != 0) { 
      console.log(`Updating user: ${JSON.stringify(user)}`);
      this.users = this.users.map(u => u.id === user.id ? {...user} : u);
      this.confirmAddUser();
      this.setOpenForm();
      return;
    } 

    this.users = [...this.users, {... user}];
    this.confirmAddUser();
    this.setOpenForm();

  }

  deleteUser(userId: number): void {
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
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "success"
        });
      }
    });
    
  }

  editUser(userId: number): void {
    this.userSelected = {... this.users.find(user => user.id === userId) ?? this.userSelected};
    this.isOpenForm = true;
  }

  confirmAddUser(): void {
    Swal.fire({
    title: "Guardado!",
    text: "¡El usuario ha sido guardado correctamente!",
    icon: "success"
    });

    this.userSelected = new User(0, '', '', '','','');
  }

  setOpenForm(): void {
    this.isOpenForm = !this.isOpenForm;
  }
}
