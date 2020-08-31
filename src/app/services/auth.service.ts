import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private toastService: ToastService) { }

  // Realiza el registro de autenticación
  doRegister(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('[AuthService]: Usuario creado con éxito');
        console.log(res);
        resolve(res);
      })
      .catch(error => {
        console.log('[AuthService]: Error al crear la nueva cuenta');
        console.log(error);
        reject(error);
      });
    });
  }

  // Comprueba autenticación para acceder a la aplicación
  doLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('[AuthService]: Acceso correcto a cuenta');
        console.log(res);
        resolve(res);
      })
      .catch(error => {
        console.log('[AuthService]: Error al acceder a la cuenta');
        console.log(error);
        reject(error);
      });
    });
  }

  // Cierra la sesión del usuario logeado
  doLogout() {
    this.fireAuth.signOut();
    console.log('[AuthService]: Sesión cerrada');
  }
}
