
import { LoadingService } from 'src/app/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarComponentOptions } from 'ion2-calendar';
import { ToastService } from 'src/app/services/toast.service';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  selectedSport: string;
  hours: any[] = [];
  formattedDay: string;
  currentUser: string;

  unsubscribe: any;

  date: Date = new Date();
  type: 'string';
  options: CalendarComponentOptions = {
    weekdays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    weekStart: 1,
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    color: 'primary'
  };

  constructor(private route: ActivatedRoute, private toastService: ToastService, private authService: AuthService,
              private loadingService: LoadingService) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.selectedSport = param['sport'];
    });
    this.currentUser = this.authService.getCurrentUser().displayName;
  }

  // Evento que se dispara cuando se selecciona una fecha
  async onChange($e) {
    const fecha = $e.format('DD-MM-YYYY');
    this.formattedDay = $e.format('DD-MM-YYYY');
    this.hours = [];
    const map = new Map();
    const mapId = new Map();
    this.unsubscribe = {};
    // Obtenemos las reservas del día seleccionado
    const loading = this.loadingService.presentLoading();
    (await loading).present().then(() => {
      this.unsubscribe =
      firebase.firestore().collection('bookings').where('day', '==', fecha).where('sport', '==', this.selectedSport).onSnapshot(
      snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'removed') {
            map.delete(change.doc.data().hour);
            mapId.delete(change.doc.data().hour);
          }
        });
        this.hours = [];
        snapshot.forEach(doc => {
          map.set(doc.data().hour, doc.data().user);
          mapId.set(doc.data().hour, doc.id);
        });
        firebase.firestore().collection('hours').orderBy('hour').get().then(async querySnapshot => {
          querySnapshot.forEach(doc => {
            const hour: any = {};
            if (map.get(doc.data().hour) !== null) {
              hour.hour = doc.data().hour;
              hour.user = map.get(doc.data().hour);
              hour.id = mapId.get(doc.data().hour);
            }
            this.hours.push(hour);
          });
          (await loading).dismiss();
        });
      });
    });
  }

  // Reserva la hora seleccionada
  reserve(hour) {
    this.toastService.presentAlertConfirm(hour, this.formattedDay, this.authService.getCurrentUser().displayName, this.selectedSport);
  }

  // Cancela una reserva
  cancelReserve(id) {
    this.toastService.presentAlertCancel(id);
  }

  // Cuando vamos a abandonar la página, dejamos de escuchar
  ionViewDidLeave(){
    if (this.unsubscribe !== undefined) {
      this.unsubscribe();
    }
  }

}
