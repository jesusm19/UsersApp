import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private url = 'http://localhost:8080/login';

    constructor(
        private http: HttpClient
    ){}

    login(username: string, password: string): Observable<any> {
        const body={
            username,
            password
        }
        return this.http.post(this.url, body);
    }

}
