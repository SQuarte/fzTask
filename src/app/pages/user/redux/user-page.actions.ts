import { Action } from '@ngrx/store';
import {FzUserDetail} from '../../../common/models/user-detail.model';

export enum UserPageActionTypes {
    FetchUser = '[UserPage] Fetch user',
    FetchUserComplete = '[UserPage] Fetch user complete',
    FetchUserError = '[UserPage] Fetch user error'
}

export class FetchUser implements Action {
    readonly type = UserPageActionTypes.FetchUser;
    constructor(public userId: number) {}
}

export class FetchUserComplete implements Action {
    readonly type = UserPageActionTypes.FetchUserComplete;
    constructor(public userDetail: FzUserDetail) {}
}


export class FetchUserError implements Action {
    readonly type = UserPageActionTypes.FetchUserError;
    constructor(err: any) {}
}

export type UserPageActionsUnion =
    | FetchUser
    | FetchUserComplete
    | FetchUserError;
