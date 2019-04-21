import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {
    AddChatMessage, AddChatMessageComplete, AddChatMessageError,
    ChatPageActionTypes,
    FetchChat, FetchChatComplete, FetchChatError,
} from './chat-page.actions';
import {FzChatService} from '../../../common/services/chat.service';


@Injectable()
export class ChatPageEffects {

    constructor(private actions$: Actions,
                private chatService: FzChatService) {}


    @Effect()
    fetchChat$: Observable<Action> = this.actions$.pipe(
        ofType<FetchChat>(ChatPageActionTypes.FetchChat),
        mergeMap((action) => {
            return this.chatService.getChat(action.ownerId, action.companionId)
                .pipe(
                    map((chat) => new FetchChatComplete(action.companionId, chat)),
                    catchError(err => of(new FetchChatError(err)))
                );
        })
    );

    @Effect()
    addChatMessage$: Observable<Action> = this.actions$.pipe(
        ofType<AddChatMessage>(ChatPageActionTypes.AddChatMessage),
        mergeMap((action) => {
            return this.chatService.addMessage(action.ownerId, action.companionId, action.message)
                .pipe(
                    map((messages) => new AddChatMessageComplete(action.ownerId, action.companionId)),
                    catchError(err => of(new AddChatMessageError(err)))
                );
        })
    );


    @Effect()
    refreshChat$: Observable<Action> = this.actions$.pipe(
        ofType<AddChatMessageComplete>(ChatPageActionTypes.AddChatMessageComplete),
        map((action) => {
            return new FetchChat(action.ownerId, action.companionId)
        })
    );

}
