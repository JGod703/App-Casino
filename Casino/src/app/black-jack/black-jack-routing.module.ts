import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlackJackPage } from './black-jack.page';

const routes: Routes = [
  {
    path: '',
    component: BlackJackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlackJackPageRoutingModule {}
