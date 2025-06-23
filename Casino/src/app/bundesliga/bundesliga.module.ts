import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BundesligaPageRoutingModule } from './bundesliga-routing.module';

import { BundesligaPage } from './bundesliga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BundesligaPageRoutingModule
  ],
  declarations: [BundesligaPage]
})
export class BundesligaPageModule {}
