import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingPageRoutingModule } from './booking-routing.module';

import { BookingPage } from './booking.page';

// Calendario
import { CalendarModule } from 'ion2-calendar';

// Pipe
import { CapitalPipe } from './../../pipes/capital.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingPageRoutingModule,
    CalendarModule,
    PipesModule
  ],
  declarations: [BookingPage]
})
export class BookingPageModule {}
