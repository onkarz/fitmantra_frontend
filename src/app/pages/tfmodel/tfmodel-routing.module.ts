import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TfmodelPage } from './tfmodel.page';

const routes: Routes = [
  {
    path: '',
    component: TfmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TfmodelPageRoutingModule {}
