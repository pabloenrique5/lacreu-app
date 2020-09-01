import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) { }

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
      cssClass: 'my-custom-class',
      header: head,
      message: mes,
      buttons: ['OK']
    });
    await alert.present();
  }
}
