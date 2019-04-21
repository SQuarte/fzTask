import {ChatMessage} from '../../../common/models/chat.model';
import {ChatPageActionsUnion, ChatPageActionTypes} from './chat-page.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export interface ChatPageState {
    chatsByCompanionId: Map<number, ChatMessage[]>;
}

const initialState: ChatPageState = {
    chatsByCompanionId : new Map()
};


export function chatPageReducers(state: ChatPageState = initialState, action: ChatPageActionsUnion): ChatPageState {
    switch (action.type) {
        case ChatPageActionTypes.FetchChatMessages: {
            return {
                ...state,
                chatsByCompanionId: new Map(state.chatsByCompanionId).set(action.companionId, [])
            };
        }
        case ChatPageActionTypes.FetchChatMessagesComplete:
        case ChatPageActionTypes.AddChatMessageComplete:{
            return {
                ...state,
                chatsByCompanionId: new Map(state.chatsByCompanionId).set(action.companionId, action.chatMessages)
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







