import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit {

  userName: string;

  constructor(private userService: UserService) { }

  signIn(form: NgForm): void {
    if (form.valid) {
      this.userService.signIn(this.userName);
    }
  }

  ngOnInit(): void {
  }

}
