import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reestablish',
  templateUrl: './reestablish.page.html',
  styleUrls: ['./reestablish.page.scss'],
})
export class ReestablishPage implements OnInit {

  email: string;

  constructor(private router: Router, private authService: AuthService, private toastService: ToastService) { }

  ngOnInit() {
    this.email = '';
  }

  // Envía un email para reestablecer la contraseña
  sendResetEmail() {
    const promise = this.authService.sendResetPassword(this.email);
    promise.then((result) => {
      this.toastService.presentAlert('Información', 'Le acabamos de enviar un correo electrónico. Verifíquelo en su bandeja de entrada');
      this.router.navigate(['login']);
    }).catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
          this.toastService.presentToast('El correo electrónico no es válido');
          break;
      }
    });
  }

  // Cancela el reestablecimiento para volver a la pantalla de login
  cancel() {
    this.router.navigate(['login']);
  }

  // Cuando estamos a punto de irnos, dejamos los campos en blanco
  ionViewDidLeave() {
    this.email = '';
  }

}
