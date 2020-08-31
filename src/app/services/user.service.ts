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
    this.user = this.fireStore.doc<any>('user/' + email);
    return this.user ? true : false;
  }

  // Guarda los datos de un usuario
  saveUser(email: string, user: string) {
    /*this.user = this.fireStore.doc<any>('user/' + email);
    this.user.set({
      user,
      email
    });*/
    firebase.database().ref('user/' + email).set({
      email,
      user
    });
    console.log('Usuario guardado');
  }
}
