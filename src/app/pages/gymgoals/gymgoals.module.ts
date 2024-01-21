import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GymgoalsPageRoutingModule } from './gymgoals-routing.module';

import { GymgoalsPage } from './gymgoals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GymgoalsPageRoutingModule
  ],
  declarations: [GymgoalsPage]
})
export class GymgoalsPageModule {}
