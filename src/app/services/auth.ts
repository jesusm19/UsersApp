import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private url = 'http://localhost:8080/login';

    private _token: string | undefined;
    private _user = signal<any>({
        isAuth: false,
        isAdmin: false,
        user: undefined
    });

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

    set user(user: any){
        this._user.set(user);
        sessionStorage.setItem('login', JSON.stringify(user));
    }

    get user(){
        if(!this._user().isAuth && sessionStorage.getItem('login') != null){
            return JSON.parse(sessionStorage.getItem('login') || '{}');
        }
        return this._user();
    }

    set token(token: string) {
        this._token = token;
        sessionStorage.setItem('token', this._token);
    }

    get token(){
        if(this._token != undefined){
            return this._token;
        } else if(sessionStorage.getItem('token') != null){
            this._token = sessionStorage.getItem('token') || '';
        }
        return this._token!;
    }

    getPayload(token: string){
        if(token != null){
            return JSON.parse(atob(token.split('.')[1]));
        }
        return null;
    }

    isAdmin(): boolean {
        return this.user?.isAdmin || false;
    }

    isAuth(): boolean {
        return this.user?.isAuth || false;
    }

    logout(){
        this._user.set({
            isAuth: false,
            isAdmin: false,
            user: undefined
        });
        this._token = undefined;
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
    }

}
