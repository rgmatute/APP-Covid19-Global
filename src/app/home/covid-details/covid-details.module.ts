import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CovidDetailsPageRoutingModule } from './covid-details-routing.module';

import { CovidDetailsPage } from './covid-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CovidDetailsPageRoutingModule
  ],
  declarations: [CovidDetailsPage]
})
export class CovidDetailsPageModule {}
