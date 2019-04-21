import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FzHeaderComponent} from './header.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    FzHeaderComponent
  ],
  exports: [
    FzHeaderComponent
  ]
})
export class FzHeaderModule { }
