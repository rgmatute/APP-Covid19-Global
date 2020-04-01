import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CovidDetailsPage } from './covid-details.page';

const routes: Routes = [
  {
    path: '',
    component: CovidDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CovidDetailsPageRoutingModule {}
