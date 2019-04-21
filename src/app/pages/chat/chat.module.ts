import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {FzHeaderModule} from '../../common/header/header.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {chatPageReducers} from './redux/chat-page.reducer';
import {ChatPageEffects} from './redux/chat-page.effects';
import {FormsModule} from '@angular/forms';
import {FzChatPageComponent} from './chat.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FzHeaderModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: FzChatPageComponent
      }
    ]),
    StoreModule.forFeature('ChatPageModule', chatPageReducers),
    EffectsModule.forFeature([ChatPageEffects])
  ],
  declarations: [FzChatPageComponent],
})
export class FzChatPageModule { }
