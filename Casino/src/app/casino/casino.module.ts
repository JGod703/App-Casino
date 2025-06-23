import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasinoPageRoutingModule } from './casino-routing.module';

import { CasinoPage } from './casino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasinoPageRoutingModule
  ],
  declarations: [CasinoPage]
})
export class CasinoPageModule {}
