import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReestablishPageRoutingModule } from './reestablish-routing.module';

import { ReestablishPage } from './reestablish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReestablishPageRoutingModule
  ],
  declarations: [ReestablishPage]
})
export class ReestablishPageModule {}
