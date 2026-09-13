import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-navbar',
  styles: ``,
  templateUrl: './navbar.html',
})
export class NavbarComponent {

  @Input() users: User[] = [];

}
