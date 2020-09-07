import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Redirecciona a la pantalla de reservas
  bookSport(sport) {
    this.router.navigate(['booking', sport]);
  }

  // Redirecciona a la pantalla de settings
  settings() {
    this.router.navigate(['settings']);
  }

}
