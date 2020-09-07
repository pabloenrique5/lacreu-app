import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Redirecciona a la pantalla de settings
  settings() {
    this.router.navigate(['settings']);
  }

}
