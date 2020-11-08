import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private userService: UserService) { }

  signout(): void {
    this.userService.signout();
  }

  isSignIn(): boolean {
    return this.userService.isSignIn();
  }

  userName(): string {
    return this.userService.getUserName();
  }

}
