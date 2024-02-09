import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TfmodelPageRoutingModule } from './tfmodel-routing.module';

import { TfmodelPage } from './tfmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TfmodelPageRoutingModule
  ],
  declarations: [TfmodelPage]
})
export class TfmodelPageModule {}
