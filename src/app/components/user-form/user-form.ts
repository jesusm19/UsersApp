import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { SharingData } from '../../services/sharing-data';

import { User } from '../../models/user';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-user-form',
  templateUrl: './user-form.html',
})
export class UserFormComponent implements OnInit {

  user: User;

  constructor(
    private sharingData: SharingData,
    private route: ActivatedRoute,
  ) {

    this.user = new User(0, '', '', '', '', '');

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId:number = +(params.get('id') || '0');
      if (userId > 0) {
        console.log(`Editing user with ID: ${userId}`);
        this.sharingData.findUserByIdEventEmitter.emit(userId);
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.invalid) {
      return;
    }
    this.sharingData.userEventEmmiter.emit(this.user);
    userForm.reset();
    userForm.resetForm();

  }

  onClear(userForm: any): void {
    this.user = new User(0, '', '', '','','');
    userForm.resetForm();
    userForm.reset();
  }
}
