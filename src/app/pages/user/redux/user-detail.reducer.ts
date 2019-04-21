import {UserDetail} from '../../../common/models/user-detail.model';
import {UserPageActionsUnion, UserPageActionTypes} from './user-page.actions';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface UserPageState {
    users: Map<number, UserDetail>;
}

const initialState: UserPageState = {
    users : new Map()
};


export function userPageReducers(state: UserPageState = initialState, action: UserPageActionsUnion): UserPageState {
    switch (action.type) {
        case UserPageActionTypes.FetchUser: {
            return {
                ...state,
                users: new Map(state.users).set(action.userId, null)
            };
        }
        case UserPageActionTypes.FetchUserComplete: {
            return  {
                ...state,
                users: new Map(state.users).set(action.userDetail.id, action.userDetail)
            };
        }
        default: {
            return state;
        }
    }
};


const getUserPageState = createFeatureSelector<UserPageState>('UserPageModule');

export const getUserPageUser = (userId) => createSelector(
    getUserPageState,
    (state) => state.users.get(userId)
);



