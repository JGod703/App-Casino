import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NbaPageRoutingModule } from './nba-routing.module';

import { NbaPage } from './nba.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NbaPageRoutingModule
  ],
  declarations: [NbaPage]
})
export class NbaPageModule {}
