import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  if(inject(AuthService).isAuth()) {
    if(isTokenExpired()){
      inject(AuthService).logout();
      inject(Router).navigate(['login']);
      return false;
    }

    if(!inject(AuthService).isAdmin()){
      inject(Router).navigate(['/forbidden']);
      return false;
    }
    return true;
  }

  inject(Router).navigate(['login']);
  
  return false;
};

const isTokenExpired = () => {
  const token = inject(AuthService).token;
  const payload = inject(AuthService).getPayload(token);
  const expirationDate = payload.exp;
  const nowDate = new Date().getTime() / 1000;

  if(nowDate > expirationDate){
    return true;
  }
  return false;
};
