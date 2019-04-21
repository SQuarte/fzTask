import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {UserPage} from './user.page';
import {RouterModule} from '@angular/router';
import {HeaderModule} from '../../common/header/header.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {userPageReducers} from './redux/user-detail.reducer';
import {UserPageEffects} from './redux/user-page.effects';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserPage
      }
    ]),
    StoreModule.forFeature('UserPageModule', userPageReducers),
    EffectsModule.forFeature([UserPageEffects])
  ],
  declarations: [UserPage]
})
export class UserPageModule { }
