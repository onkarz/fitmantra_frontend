import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterbylevelPage } from './filterbylevel.page';

const routes: Routes = [
  {
    path: '',
    component: FilterbylevelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterbylevelPageRoutingModule {}
