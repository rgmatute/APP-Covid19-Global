import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CovidDetailsPageRoutingModule } from './covid-details-routing.module';

import { CovidDetailsPage } from './covid-details.page';
import { Covid19DetailsComponentComponent } from 'src/app/components/covid19-details-component/covid19-details-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CovidDetailsPageRoutingModule
  ],
  declarations: [
    CovidDetailsPage,
    Covid19DetailsComponentComponent
  ]
})
export class CovidDetailsPageModule {}
