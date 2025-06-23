import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlackJackPageRoutingModule } from './black-jack-routing.module';

import { BlackJackPage } from './black-jack.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlackJackPageRoutingModule
  ],
  declarations: [BlackJackPage]
})
export class BlackJackPageModule {}
