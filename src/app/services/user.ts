import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private users: User[] = [
        new User(1, 'John', 'Doe', 'john.doe@example.com', 'johndoe', 'password123'),
        new User(2, 'Jane', 'Smith', 'jane.smith@example.com', 'janesmith', 'password456')
    ];

    findAll(): Observable<User[]> {
        return of(this.users);
    }
}
