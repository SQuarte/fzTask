import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user-detail/2', pathMatch: 'full' },
  { path: 'user-detail/:userId', loadChildren: './pages/user/user.module#UserPageModule' },
  { path: 'chat/:companionId', loadChildren: './pages/chat/chat.module#ChatPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
