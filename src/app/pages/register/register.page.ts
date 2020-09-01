import { UserService } from './../../services/user.service';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private toastService: ToastService, private authService: AuthService) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  // Realiza comprobaciones y registra un nuevo usuario
  register() {
    if (this.password === this.confirmPassword) {
        const promise = this.authService.doRegister(this.email, this.password);
        promise.then((result) => {
          this.toastService.presentAlert('Información',
          'Le acabamos de enviar un correo electrónico. Verifíquelo en su bandeja de entrada');
          this.router.navigate(['login']);
        }).catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.toastService.presentAlert('Atención', 'Ya existe un usuario con este correo electrónico');
              break;
            case 'auth/weak-password':
              this.toastService.presentAlert('Atención', 'La contraseña debe tener al menos 6 caracteres');
              break;
            case 'auth/invalid-email':
              this.toastService.presentToast('El correo electrónico no es válido');
              break;
          }
        });
    } else {
      this.toastService.presentToast('La contraseña y la confirmación no coinciden');
    }
  }

  // Cancela el registro para volver a la pantalla de login
  cancel() {
    this.router.navigate(['login']);
  }

  // Cuando estamos a punto de irnos, dejamos los campos en blanco
  ionViewDidLeave() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

}
