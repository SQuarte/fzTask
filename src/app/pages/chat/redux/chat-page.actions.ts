import { Action } from '@ngrx/store';
import {FzChat} from '../../../common/models/chat.model';

export enum ChatPageActionTypes {
    FetchChat = '[ChatPage] Fetch page',
    FetchChatComplete = '[ChatPage] Fetch page complete',
    FetchChatError = '[ChatPage] Fetch page error',
    AddChatMessage = '[ChatPage] Add chat message',
    AddChatMessageComplete = '[ChatPage] Add chat message complete',
    AddChatMessageError = '[ChatPage] Add chat message error'
}

export class FetchChat implements Action {
    readonly type = ChatPageActionTypes.FetchChat;
    constructor(public ownerId: number, public companionId: number) {
    }
}

export class FetchChatComplete implements Action {
    readonly type = ChatPageActionTypes.FetchChatComplete;
    constructor(public companionId: number, public chat: FzChat) {}
}


export class FetchChatError implements Action {
    readonly type = ChatPageActionTypes.FetchChatError;
    constructor(err: any) {}
}


export class AddChatMessage implements Action {
    readonly type = ChatPageActionTypes.AddChatMessage;
    constructor(public ownerId: number, public companionId: number, public message: string) {
    }
}

export class AddChatMessageComplete implements Action {
    readonly type = ChatPageActionTypes.AddChatMessageComplete;
    constructor(public ownerId,public companionId: number) {
    }
}

export class AddChatMessageError implements Action {
    readonly type = ChatPageActionTypes.AddChatMessageError;
    constructor(public err: any) {
    }
}

export type ChatPageActionsUnion =
    | FetchChat
    | FetchChatComplete
    | FetchChatError
    | AddChatMessage
    | AddChatMessageComplete
    | AddChatMessageError;
