import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BjinfoPageRoutingModule } from './bjinfo-routing.module';

import { BjinfoPage } from './bjinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BjinfoPageRoutingModule
  ],
  declarations: [BjinfoPage]
})
export class BjinfoPageModule {}
