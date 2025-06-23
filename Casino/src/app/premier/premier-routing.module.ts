import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PremierPage } from './premier.page';

const routes: Routes = [
  {
    path: '',
    component: PremierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PremierPageRoutingModule {}
