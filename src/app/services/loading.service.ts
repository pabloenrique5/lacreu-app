import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  async presentLoading() {
    const loading = this.loadingController.create({
      cssClass: 'loading-class',
      message: 'Cargando...'
    });
    return await loading;
  }
}
