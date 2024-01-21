import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TfPageRoutingModule } from './tf-routing.module';

import { TfPage } from './tf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TfPageRoutingModule
  ],
  declarations: [TfPage]
})
export class TfPageModule {}
