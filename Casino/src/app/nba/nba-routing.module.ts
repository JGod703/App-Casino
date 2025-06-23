import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NbaPage } from './nba.page';

const routes: Routes = [
  {
    path: '',
    component: NbaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NbaPageRoutingModule {}
