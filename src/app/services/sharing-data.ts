import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingData {

    private userEventEmitter = new EventEmitter<User>();
    private deleteUserEvent = new EventEmitter<number>();
    private findUserByIdEvent = new EventEmitter<number>();
    private selectedUserEvent = new EventEmitter<User>();

    get userEventEmmiter(): EventEmitter<User> {
        return this.userEventEmitter;
    }

    get deleteUserEventEmitter(): EventEmitter<number> {
        return this.deleteUserEvent;
    }

    get findUserByIdEventEmitter(): EventEmitter<number> {
        return this.findUserByIdEvent;
    }

    get selectedUserEventEmitter(): EventEmitter<User> {
        return this.selectedUserEvent;
    }

}
