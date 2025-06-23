import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapturaDatosPage } from './captura-datos.page';

const routes: Routes = [
  {
    path: '',
    component: CapturaDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapturaDatosPageRoutingModule {}
