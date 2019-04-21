import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {FzChat} from '../../common/models/chat.model';
import * as fromChatPage from '../chat/redux/chat-page.reducer';
import {Subscription} from 'rxjs';
import {AddChatMessage, FetchChat} from './redux/chat-page.actions';
import {Location} from '@angular/common';
import {FzUserDetailService} from '../../common/services/user-detail.service';

@Component({
  selector: 'fz-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class FzChatPageComponent implements OnInit,AfterViewInit,OnDestroy {


  chat: FzChat = {} as any;
  userId: number;
  companionId: number;

  chatMessagesSubscription: Subscription;
  chatMessageStr: string;

  @ViewChild('content') private content: any;


  constructor(private store: Store<any>,
              private activatedRoute: ActivatedRoute,
              private userService: FzUserDetailService,
              private location: Location) { }

  ngOnInit() {
    this.userId = this.userService.getCurrentUserId();
    this.activatedRoute.params.subscribe(
        (params) => {
          this.companionId = params.companionId;
          this.store.dispatch(new FetchChat(this.userId, this.companionId));
          if (this.chatMessagesSubscription) {
            this.chatMessagesSubscription.unsubscribe();
          }
          this.chatMessagesSubscription = this.store
              .pipe(select(fromChatPage.getChatPageCompanionChat(this.companionId)))
              .subscribe((chat) => {
                  this.chat = chat;
              });
        }
    );
  }

  ngAfterViewInit(): void {
      this.scrollToBottom();
  }

  sendMessage(message: string) {
      this.store.dispatch(new AddChatMessage(this.userId, this.companionId, message));
      this.chatMessageStr = '';
      this.scrollToBottom();
  }

  goBack() {
      this.location.back();
  }

  ngOnDestroy(): void {
      this.unsubscribe();
  }

  private scrollToBottom() {
      this.content.scrollToBottom();
  }

  private unsubscribe() {
      if (this.chatMessagesSubscription) {
          this.unsubscribe()
      }
  }
}
