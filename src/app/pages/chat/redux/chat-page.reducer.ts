import {FzChat, FzChatMessage} from '../../../common/models/chat.model';
import {ChatPageActionsUnion, ChatPageActionTypes} from './chat-page.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export interface ChatPageState {
    chatsByCompanionId: Map<number, FzChat>;
}

const initialState: ChatPageState = {
    chatsByCompanionId : new Map()
};


export function chatPageReducers(state: ChatPageState = initialState, action: ChatPageActionsUnion): ChatPageState {
    switch (action.type) {
        case ChatPageActionTypes.FetchChat: {
            return {
                ...state,
                chatsByCompanionId: new Map(state.chatsByCompanionId).set(action.companionId, {} as FzChat)
            };
        }
        case ChatPageActionTypes.FetchChatComplete:
        {
            return {
                ...state,
                chatsByCompanionId: new Map(state.chatsByCompanionId).set(action.companionId, action.chat)
            };
        }
        default: {
            return state;
        }
    }
}


const getChatPageState = createFeatureSelector<ChatPageState>('ChatPageModule');
export const getChatPageCompanionChat = (companionId) => createSelector(
    getChatPageState,
    (state) => state.chatsByCompanionId.get(companionId)
);







