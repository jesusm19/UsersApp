import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { User } from '../../models/user';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-user-form',
  templateUrl: './user-form.html',
})
export class UserFormComponent {

  @Input() user: User;
  @Output() userEventEmitter = new EventEmitter<User>();

  constructor() {
    this.user = new User(0, '', '', '', '', '');
  }
  

  onSubmit(userForm: NgForm): void {
    if (userForm.invalid) {
      return;
    }
    this.userEventEmitter.emit(this.user);
    userForm.reset();
    userForm.resetForm();

  }

  onClear(userForm: any): void {
    this.user = new User(0, '', '', '','','');
    userForm.resetForm();
    userForm.reset();
  }
}
