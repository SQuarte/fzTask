import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {ChatMessage} from '../../common/models/chat.model';
import * as fromChatPage from '../chat/redux/chat-page.reducer';
import {UserDetailService} from '../../common/services/user-detail.service';
import {Subscription} from 'rxjs';
import {AddChatMessage, FetchChatMessages} from './redux/chat-page.actions';
import {Location} from '@angular/common';
import {ChatMessagePageExtModel} from './model/chat-message-page-ext.model';
import {Content} from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPageComponent implements OnInit,AfterViewInit {


  chatMessages: ChatMessagePageExtModel[];
  userId: number;
  companionId: number;
  chatName: string;
  chatMessagesSubscription: Subscription;
  chatMessageStr: string;

  @ViewChild('content') private content: any;


  constructor(private store: Store<any>,
              private activatedRoute: ActivatedRoute,
              private userService: UserDetailService,
              private location: Location) { }

  ngOnInit() {
    this.userId = this.userService.getCurrentUserId();
    this.activatedRoute.params.subscribe(
        (params) => {
          this.companionId = params.companionId;
          this.store.dispatch(new FetchChatMessages(this.userId, this.companionId));
          this.chatName = this.getChatName(this.userId, this.companionId);
          if (this.chatMessagesSubscription) {
            this.chatMessagesSubscription.unsubscribe();
          }
          this.chatMessagesSubscription = this.store
              .pipe(select(fromChatPage.getChatPageCompanionChat(this.companionId)))
              .subscribe((messages) => {
                  this.chatMessages = messages.map((message) =>
                      Object.assign({} , message, {isOwner: this.isHostMessage(message)})
                  );
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

  private isHostMessage(message: ChatMessage) {
      return message.ownerId === this.companionId;
  }

  private getChatName(userId: number, companionId: number) {
      return `${this.userService.getUserNameById(userId)}&${this.userService.getUserNameById(companionId)}`;
  }

  private scrollToBottom() {
      this.content.scrollToBottom();
  }

}
