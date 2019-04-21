import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {FzUserDetail} from '../../common/models/user-detail.model';
import * as fromUserPageSelector from './redux/user-page.reducer';
import {ActivatedRoute, Router} from '@angular/router';
import {FetchUser} from './redux/user-page.actions';

@Component({
  selector: 'fz-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class FzUserPage implements OnInit, OnDestroy {
  user: FzUserDetail;
  userSubscription: Subscription;
  constructor(private store: Store<any>,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
        (params) => {
          const userId = params.userId;
          this.store.dispatch(new FetchUser(userId));
          if (this.userSubscription) {
            this.userSubscription.unsubscribe();
          }
          this.userSubscription = this.store
              .pipe(select(fromUserPageSelector.getUserPageUser(userId)))
              .subscribe((user) => { this.user = user; });
        }
    );

  }

  navigateToChat() {
      if (this.user) {
          this.router.navigateByUrl('/chat/' + this.user.id);
      }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
