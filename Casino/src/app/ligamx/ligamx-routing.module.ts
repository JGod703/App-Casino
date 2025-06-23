import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LigamxPage } from './ligamx.page';

const routes: Routes = [
  {
    path: '',
    component: LigamxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LigamxPageRoutingModule {}
