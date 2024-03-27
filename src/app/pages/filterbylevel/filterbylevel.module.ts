import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterbylevelPageRoutingModule } from './filterbylevel-routing.module';

import { FilterbylevelPage } from './filterbylevel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterbylevelPageRoutingModule
  ],
  declarations: [FilterbylevelPage]
})
export class FilterbylevelPageModule {}
