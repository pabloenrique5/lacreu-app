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

  bookSport(sport) {
    this.router.navigate(['booking', sport]);
  }

}
