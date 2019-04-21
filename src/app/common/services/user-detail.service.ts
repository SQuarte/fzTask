import { Injectable } from '@angular/core';
import {UserDetail} from '../models/user-detail.model';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor() { }

  getUserById(userId: number): Observable<UserDetail> {
    return of(
        new UserDetail(
            userId,
            'Almee C. Teesdale',
            this.getDescriptionForUser(),
            'https://via.placeholder.com/150'
            )
    );
  }

  getCurrentUserId(): number {
    return 1;
  }

  getUserNameById(id: number): string {
    return `name_${id}`;
  }

  private getDescriptionForUser() {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam cursus volutpat tempor. In eget vulputate leo, a gravida orci. Donec tempor lectus arcu, at bibendum nisi lacinia at. Cras porttitor nulla ut erat lobortis, in blandit leo tincidunt. Ut consequat dolor at felis efficitur commodo quis id mi. Pellentesque viverra urna in diam volutpat efficitur. Proin maximus vitae urna id iaculis. Vestibulum dictum, ante nec commodo tempus, ligula lacus cursus lorem, sit amet finibus magna urna vitae enim. Maecenas eget mi eros.

Sed hendrerit commodo libero euismod sollicitudin. Nulla maximus, eros id condimentum porta, nunc erat ornare turpis, vel commodo dui sem quis risus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce id pulvinar sapien. In hac habitasse platea dictumst. Integer egestas mattis diam, at scelerisque felis. Pellentesque posuere scelerisque tempor.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus suscipit gravida sapien, at eleifend nisi suscipit sed. Donec orci lectus, luctus ut ex nec, congue scelerisque nunc. Vivamus ullamcorper tempus aliquam. Phasellus tempor, dolor quis viverra lobortis, purus velit cursus dui, ut gravida velit mi at turpis. Etiam id enim condimentum, egestas enim non, mollis tellus. Praesent sed fringilla orci. In egestas ultricies arcu. Donec vitae dolor tellus. Ut rutrum eros sed maximus pulvinar. Donec erat dolor, viverra convallis aliquet in, tristique sit amet purus.

In ut suscipit ipsum. Integer porta sapien mattis risus porttitor laoreet. Mauris lobortis ex non feugiat lobortis. Pellentesque nisi augue, varius vitae gravida vel, dapibus sed quam. Nullam varius vel purus commodo fringilla. Vivamus felis ligula, efficitur non gravida ac, sollicitudin nec ex. Fusce mattis egestas libero venenatis dignissim. Cras malesuada eros enim, in euismod dui lobortis ut. Ut est lacus, porttitor vitae volutpat vel, tempus in risus. Sed sit amet placerat velit. Ut aliquam mi ligula, id rhoncus nisl volutpat eget. Ut eleifend eros diam, ut egestas nibh varius quis. Suspendisse non nisi blandit, porta risus sit amet, feugiat ante. Donec viverra purus massa, ut ornare felis imperdiet id.

Ut vestibulum facilisis molestie. Nulla viverra mauris non nibh viverra hendrerit. Vestibulum porttitor, nunc at sagittis facilisis, justo massa hendrerit velit, ut auctor lorem nisl eu tellus. Aliquam finibus lobortis semper. Sed suscipit aliquam convallis. Donec velit nulla, pellentesque eget erat eget, efficitur porttitor turpis. Nam consectetur viverra nibh. Aenean sapien elit, tempor eget imperdiet eget, euismod non augue. Nulla id laoreet velit.,`
  }
}
