import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private firebaseService: FirebaseService,
              private router: Router) { }

  // Presentar Toast
  async presentToast(mes) {
    const toast = this.toastCtrl.create({
      message: mes,
      duration: 2000,
      position: 'middle'
    });
    (await toast).present();
  }

  // Presentar alerta
  async presentAlert(head, mes) {
    const alert = await this.alertCtrl.create({
      header: head,
      message: mes,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Presentar diálogo de confirmación
  async presentAlertConfirm(hour, day, user, sport) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Quieres reservar esta hora?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.router.navigate(['stripe']);
            /*this.firebaseService.reserve(hour, day, user, sport).then(() => {
              this.presentAlert('Información', 'Hora reservada con éxito');
            }).catch((error) => {
              console.log(error);
              this.presentAlert('Atención', 'Ha ocurrido un error al reservar la hora');
            });*/
          }
        }
      ]
    });
    await alert.present();
  }

  // Presentar diálogo de cancelación
  async presentAlertCancel(id) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación',
      message: '¿Quieres cancelar tu reserva?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.firebaseService.cancel(id).then(() => {
              this.presentAlert('Información', 'Hora cancelada con éxito');
            }).catch((error) => {
              console.log(error);
              this.presentAlert('Atención', 'Ha ocurrido un error al cancelar la hora');
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
