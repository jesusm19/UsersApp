import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingData } from '../../services/sharing-data';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class LoginComponent {
  user: User;

  constructor(private sharingData: SharingData){
    this.user = new User();
  }

  onSubmit(){
    if(!this.user.username || !this.user.password){
      Swal.fire(
        'Error de validación',
        'Username y password requeridos',
        'error'
      );
    } else{
      this.sharingData.loginEventEmitter.emit({ username: this.user.username, password: this.user.password });
    }
  }
}
