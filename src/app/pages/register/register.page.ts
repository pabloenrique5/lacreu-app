import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  user: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.email = '';
    this.user = '';
    this.password = '';
    this.confirmPassword = '';
  }

  register() {}

  cancel() {
    this.router.navigate(['login']);
  }

  // Cuando estamos a punto de irnos, dejamos los campos en blanco
  ionViewDidLeave() {
    this.email = '';
    this.user = '';
    this.password = '';
    this.confirmPassword = '';
  }

}
