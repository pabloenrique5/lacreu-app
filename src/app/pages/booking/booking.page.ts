import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarComponentOptions, CalendarModalOptions, DayConfig, CalendarModal, CalendarResult } from 'ion2-calendar';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
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

  date: Date = new Date();
  type: 'string';
  options: CalendarComponentOptions = {
    weekdays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    weekStart: 1,
    monthPickerFormat: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
    color: 'primary'
  };

  constructor(private route: ActivatedRoute, private toastService: ToastService, private authService: AuthService) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.selectedSport = param['sport'];
    });
    this.currentUser = this.authService.getCurrentUser().displayName;
  }

  // Evento que se dispara cuando se selecciona una fecha
  onChange($e) {
    const fecha = $e.format('DD-MM-YYYY');
    this.formattedDay = $e.format('DD-MM-YYYY');
    this.hours = [];
    const map = new Map();
    const mapId = new Map();
    // Obtenemos las reservas del día seleccionado
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
        firebase.firestore().collection('hours').orderBy('hour').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const hour: any = {};
            if (map.get(doc.data().hour) !== null) {
              hour.hour = doc.data().hour;
              hour.user = map.get(doc.data().hour);
              hour.id = mapId.get(doc.data().hour);
            }
            this.hours.push(hour);
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

}
