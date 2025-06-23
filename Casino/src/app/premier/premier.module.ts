import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremierPageRoutingModule } from './premier-routing.module';

import { PremierPage } from './premier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremierPageRoutingModule
  ],
  declarations: [PremierPage]
})
export class PremierPageModule {}
