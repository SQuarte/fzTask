import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {userPageReducers} from './redux/user-page.reducer';
import {UserPageEffects} from './redux/user-page.effects';
import {FzUserPage} from './user.page';
import {FzHeaderModule} from '../../common/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FzHeaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: FzUserPage
      }
    ]),
    StoreModule.forFeature('UserPageModule', userPageReducers),
    EffectsModule.forFeature([UserPageEffects])
  ],
  declarations: [FzUserPage]
})
export class FzUserPageModule { }
