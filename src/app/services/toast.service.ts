import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async presentToast(mes) {
    const toast = this.toastCtrl.create({
      message: mes,
      duration: 2000,
      position: 'middle'
    });
    (await toast).present();
  }
}
