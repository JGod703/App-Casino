import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BundesligaPage } from './bundesliga.page';

const routes: Routes = [
  {
    path: '',
    component: BundesligaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundesligaPageRoutingModule {}
