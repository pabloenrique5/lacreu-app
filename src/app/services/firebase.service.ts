import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  // Guarda una nueva reserva
  reserve(hour: string, day: string, user: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.firestore().collection('bookings').add({
        day,
        hour,
        user
      }).then((res) => {
        resolve(res);
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  // Elimina una reserva de Firebase
  cancel(id: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.firestore().collection('bookings').doc(id).delete()
      .then(doc => {
        resolve(doc);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
