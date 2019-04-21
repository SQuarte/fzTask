import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ChatService} from '../../../common/services/chat.service';
import {
    AddChatMessage,
    ChatPageActionTypes,
    FetchChatMessages,
    FetchChatMessagesComplete,
    FetchChatMessagesError
} from './chat-page.actions';


@Injectable()
export class ChatPageEffects {

    constructor(private actions$: Actions,
                private chatService: ChatService) {}


    @Effect()
    fetchChatMessages$: Observable<Action> = this.actions$.pipe(
        ofType<FetchChatMessages>(ChatPageActionTypes.FetchChatMessages),
        mergeMap((action) => {
            return this.chatService.getMessages(action.ownerId, action.companionId)
                .pipe(
                    map((messages) => new FetchChatMessagesComplete(action.companionId, messages)),
                    catchError(err => of(new FetchChatMessagesError(err)))
                );
        })
    );

    @Effect()
    addChatMessage$: Observable<Action> = this.actions$.pipe(
        ofType<AddChatMessage>(ChatPageActionTypes.AddChatMessage),
        mergeMap((action) => {
            return this.chatService.addMessage(action.ownerId, action.companionId, action.message)
                .pipe(
                    map((messages) => new FetchChatMessagesComplete(action.companionId, messages)),
                    catchError(err => of(new FetchChatMessagesError(err)))
                );
        })
    );

}
