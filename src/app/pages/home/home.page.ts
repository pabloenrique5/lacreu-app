import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  // Antes de entrar en home, comprobamos si el correo está verificado
  ionViewWillEnter() {
    
  }

}
