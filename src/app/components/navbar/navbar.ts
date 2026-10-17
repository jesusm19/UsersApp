import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  imports: [RouterModule],
  selector: 'app-navbar',
  styles: ``,
  templateUrl: './navbar.html',
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  get login() {
    return this.authService.user;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
