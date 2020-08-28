import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string;
  password: string;

  constructor() { }

  ngOnInit() {
    this.user = '';
    this.password = '';
  }

  login() {}

  register() {}

}
