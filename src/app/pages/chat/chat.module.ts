import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ChatPageComponent } from './chat.page';
import { RouterModule } from '@angular/router';
import {HeaderModule} from '../../common/header/header.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {chatPageReducers} from './redux/chat-page.reducer';
import {ChatPageEffects} from './redux/chat-page.effects';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatPageComponent
      }
    ]),
    StoreModule.forFeature('ChatPageModule', chatPageReducers),
    EffectsModule.forFeature([ChatPageEffects])
  ],
  declarations: [ChatPageComponent],
})
export class ChatPageModule { }
