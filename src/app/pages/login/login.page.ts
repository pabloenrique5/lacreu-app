import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthService, private toastService: ToastService) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  // Realiza el login del usuario
  login() {
    const promise = this.authService.doLogin(this.email, this.password);
    promise.then(res => {
      this.router.navigate(['home']);
    }).catch(error => {
      console.log(error);
      this.toastService.presentToast('El correo electrónico o la contraseña no son correctos');
    });
  }

  // Navega a la página de registro
  register() {
    this.router.navigate(['register']);
  }

}
