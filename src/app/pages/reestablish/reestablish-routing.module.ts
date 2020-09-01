import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReestablishPage } from './reestablish.page';

const routes: Routes = [
  {
    path: '',
    component: ReestablishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReestablishPageRoutingModule {}
