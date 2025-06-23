import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TragamonedasPageRoutingModule } from './tragamonedas-routing.module';

import { TragamonedasPage } from './tragamonedas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TragamonedasPageRoutingModule
  ],
  declarations: [TragamonedasPage]
})
export class TragamonedasPageModule {}
