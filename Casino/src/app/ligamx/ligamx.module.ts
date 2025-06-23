import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LigamxPageRoutingModule } from './ligamx-routing.module';

import { LigamxPage } from './ligamx.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LigamxPageRoutingModule
  ],
  declarations: [LigamxPage]
})
export class LigamxPageModule {}
