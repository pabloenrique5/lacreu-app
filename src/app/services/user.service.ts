import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any;

  constructor(private fireStore: AngularFirestore) { }

  // Comprueba si existe un usuario a partir de un email
  checkUserEmail(email: string): boolean {
    this.user = this.fireStore.doc<any>('users/' + email);
    return this.user ? true : false;
  }

  // Guarda los datos de un usuario
  saveUser(email: string, user: string) {
    this.fireStore.collection('users').doc(email).set({
      email,
      user
    });
  }

  // Actualiza los datos de un usuario
  updateUser(email: string, user: string) {
    this.fireStore.collection('users').doc(email).update({
      email,
      user
    });
  }

  // Obtiene los usuarios con un nombre determinado
  findUserByUserName(userName: string) {
    return this.fireStore.firestore.collection('users').where('user', '==', userName).get();
  }
}
