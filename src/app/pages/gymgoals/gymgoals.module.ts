import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GymgoalsPageRoutingModule } from './gymgoals-routing.module';

import { GymgoalsPage } from './gymgoals.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GymgoalsPageRoutingModule,
    MatProgressSpinnerModule,
     NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  declarations: [GymgoalsPage]
})
export class GymgoalsPageModule {}
