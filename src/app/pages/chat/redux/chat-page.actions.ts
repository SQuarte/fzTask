import { Action } from '@ngrx/store';
import { ChatMessage } from '../../../common/models/chat.model';

export enum ChatPageActionTypes {
    FetchChatMessages = '[ChatPage] Fetch page',
    FetchChatMessagesComplete = '[ChatPage] Fetch page complete',
    FetchChatMessagesError = '[ChatPage] Fetch page error',
    AddChatMessage = '[ChatPage] Add chat message',
    AddChatMessageComplete = '[ChatPage] Add chat message complete',
    AddChatMessageError = '[ChatPage] Add chat message error'
}

export class FetchChatMessages implements Action {
    readonly type = ChatPageActionTypes.FetchChatMessages;
    constructor(public ownerId: number, public companionId: number) {
    }
}

export class FetchChatMessagesComplete implements Action {
    readonly type = ChatPageActionTypes.FetchChatMessagesComplete;
    constructor(public companionId: number, public chatMessages: ChatMessage[]) {}
}


export class FetchChatMessagesError implements Action {
    readonly type = ChatPageActionTypes.FetchChatMessagesError;
    constructor(err: any) {}
}


export class AddChatMessage implements Action {
    readonly type = ChatPageActionTypes.AddChatMessage;
    constructor(public ownerId: number, public companionId: number, public message: string) {
    }
}

export class AddChatMessageComplete implements Action {
    readonly type = ChatPageActionTypes.AddChatMessageComplete;
    constructor(public companionId: number, public chatMessages: ChatMessage[]) {
    }
}

export class AddChatMessageError implements Action {
    readonly type = ChatPageActionTypes.AddChatMessageError;
    constructor() {
    }
}

export type ChatPageActionsUnion =
    | FetchChatMessages
    | FetchChatMessagesComplete
    | FetchChatMessagesError
    | AddChatMessage
    | AddChatMessageComplete
    | AddChatMessageError;
