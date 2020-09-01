import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  // Realiza el registro de autenticación
  doRegister(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('[AuthService]: Usuario creado con éxito');
        console.log(res);
        this.sendVerification();
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
        console.log();
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

  // Obtiene el usuario actualmente autenticado
  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  // Envía un email de verificación
  sendVerification() {
    const user = firebase.auth().currentUser;
    user.sendEmailVerification()
      .then(() => {
        console.log('[AuthService]: Email enviado');
      }).catch(error => {
        console.log('[AuthService]: Error enviando el email de verificación');
        console.log(error);
      });
  }

  // Envía un email de reseteo de password
  sendResetPassword(email) {
    return new Promise<any>((resolve, reject) => {
      const auth = firebase.auth();
      auth.sendPasswordResetEmail(email)
      .then((res) => {
        console.log('[AuthService]: Email enviado');
        resolve(res);
      }).catch(error => {
        console.log('[AuthService]: Error enviando el email de reseteo de contraseña');
        console.log(error);
        reject(error);
      });
    });
  }
}
