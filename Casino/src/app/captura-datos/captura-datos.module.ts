import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapturaDatosPageRoutingModule } from './captura-datos-routing.module';

import { CapturaDatosPage } from './captura-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapturaDatosPageRoutingModule
  ],
  declarations: [CapturaDatosPage]
})
export class CapturaDatosPageModule {}
