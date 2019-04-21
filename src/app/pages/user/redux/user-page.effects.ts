import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {FetchUser, FetchUserComplete, FetchUserError, UserPageActionTypes} from './user-page.actions';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {FzUserDetailService} from '../../../common/services/user-detail.service';

@Injectable()
export class UserPageEffects {

    constructor(private actions$: Actions,
                private userDetailService: FzUserDetailService) {}

    @Effect()
    fetchUser$: Observable<Action> = this.actions$.pipe(
        ofType<FetchUser>(UserPageActionTypes.FetchUser),
        mergeMap((action) => {
            return this.userDetailService.getUserById(action.userId)
                .pipe(
                    map((user) => new FetchUserComplete(user)),
                    catchError(err => of(new FetchUserError(err)))
                );
        })
    );
}
