import { Component, Output, EventEmitter, Input, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { SharingData } from '../../services/sharing-data';

import { User } from '../../models/user';
import { UserService } from '../../services/user';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-user-form',
  templateUrl: './user-form.html',
})
export class UserFormComponent implements OnInit {

  user: User;

  private cdr = inject(ChangeDetectorRef);

  constructor(
    private userService: UserService,
    private sharingData: SharingData,
    private route: ActivatedRoute,
  ) {

    this.user = new User();

  }
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const userId:number = +(params.get('id') || '0');
      console.log(`Retrieved user ID from route: ${userId}`);
      if (userId > 0) {
        this.userService.findById(userId).subscribe(user => {
            console.log(`Retrieved user from service: ${JSON.stringify(user)}`);
          this.user = {...user};
          // OnPush: the HTTP response arrives outside a template-triggered event, so force a check.
          this.cdr.markForCheck();
        });
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
    this.user = new User();
    userForm.resetForm();
    userForm.reset();
  }
}

