import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallespagoPage } from './detallespago.page';

const routes: Routes = [
  {
    path: '',
    component: DetallespagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallespagoPageRoutingModule {}
