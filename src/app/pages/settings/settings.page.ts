import { UserService } from './../../services/user.service';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  name: string;
  isDisabled: boolean;

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService,
              private userService: UserService) { }

  ngOnInit() {
    this.name = this.authService.getCurrentUser().displayName;
    this.isDisabled = true;
  }

  // Función para modificar el nombre de usuario
  onEditName(toUpdate: boolean) {
    this.isDisabled = (this.isDisabled) ? false : true;
    if (toUpdate) {
      const prom = this.authService.updateUserProfile(this.name);
      prom.then((result) => {
        this.userService.updateUser(this.authService.getCurrentUser().email, this.name);
        this.toastService.presentAlert('Información', 'Nombre actualizado correctamente');
      }).catch(error => {
        this.toastService.presentAlert('Información', 'Error al actualizar el nombre');
        this.isDisabled = false;
      });
      // Comprobar si ya existe algún usuario con ese nombre
      /*this.userService.findUserByUserName(this.name).then(promise => {
        console.log('Número de coincidencias');
        console.log(promise.docs.length);
        if (promise.docs.length > 0) {
        } else {
          this.toastService.presentAlert('Información', 'Ya existe un usuario con ese nombre');
          this.isDisabled = false;
        }
      });*/
    }
  }

  // Cierra la sesión
  closeSession() {
    this.authService.doLogout();
    this.router.navigate(['login']);
  }

}
