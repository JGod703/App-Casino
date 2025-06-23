import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallespagoPageRoutingModule } from './detallespago-routing.module';

import { DetallespagoPage } from './detallespago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallespagoPageRoutingModule
  ],
  declarations: [DetallespagoPage]
})
export class DetallespagoPageModule {}
