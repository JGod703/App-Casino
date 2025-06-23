import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TragamonedasPage } from './tragamonedas.page';

const routes: Routes = [
  {
    path: '',
    component: TragamonedasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TragamonedasPageRoutingModule {}
