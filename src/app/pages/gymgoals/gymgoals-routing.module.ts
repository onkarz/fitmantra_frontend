import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GymgoalsPage } from './gymgoals.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: GymgoalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})
export class GymgoalsPageRoutingModule {}
