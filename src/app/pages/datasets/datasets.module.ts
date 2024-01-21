import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatasetsPageRoutingModule } from './datasets-routing.module';

import { DatasetsPage } from './datasets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DatasetsPageRoutingModule
  ],
  declarations: [DatasetsPage]
})
export class DatasetsPageModule {}
