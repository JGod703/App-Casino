import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasinoPage } from './casino.page';

const routes: Routes = [
  {
    path: '',
    component: CasinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasinoPageRoutingModule {}
