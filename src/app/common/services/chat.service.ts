import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {FzChat, FzChatMessage} from '../models/chat.model';
import {FzUserDetailService} from './user-detail.service';

@Injectable({
  providedIn: 'root'
})
export class FzChatService {

  constructor(public userService: FzUserDetailService) { }

  private static CHAT_UNS = 'FZ_CHAT';

  getChat(userId: number, companionId: number): Observable<FzChat> {
    const chatId = this.getChatId(userId, companionId);
    let chat = this.getChatFromLocalStorage(chatId);
    if (!chat || !chat.messages) {
      this.initChat(userId, companionId);
    }
    chat = this.getChatFromLocalStorage(chatId);
    chat.messages.forEach((message) => message.isOwner = this.isHostMessage(message,companionId));
    return of(chat);
  }

  addMessage(ownerId: number, companionId: number, message: string): Observable<any>{
    const chatId = this.getChatId(ownerId, companionId);
    return of(this.saveMessageToLocalStore(chatId, new FzChatMessage(ownerId, companionId, message, new Date())))
  }



  private saveMessageToLocalStore(chatId: string, message: FzChatMessage): FzChat {
    const chats = JSON.parse(localStorage.getItem(FzChatService.CHAT_UNS )) || {};
    const chat = chats[chatId] || {};
    chat.messages.push(message);
    chats[chatId] = chat;
    localStorage.setItem(FzChatService.CHAT_UNS, JSON.stringify(chats));
    return chat;
  }

  private getChatFromLocalStorage(chatId: string): FzChat {
    const chats = JSON.parse(localStorage.getItem(FzChatService.CHAT_UNS )) || {};
    const chat = chats[chatId] || {};
    return chat;
  }

  private getChatId(ownerId: number, companionId: number): string {
    return `${ownerId}_${companionId}`;
  }

  private initChat(userId: number, companionId: number) {
    const messages = [
      new FzChatMessage(companionId, userId, 'Simple message 1', new Date()),
      new FzChatMessage(companionId, userId, 'Simple message 2', new Date()),
      new FzChatMessage(companionId, userId, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent scelerisque non sapien ut efficitur. Aenean suscipit suscipit metus, in luctus est eleifend quis. Pellentesque ex libero, volutpat luctus dignissim sed, commodo vel eros. Sed mattis nisl in justo accumsan scelerisque. Nulla ullamcorper posuere diam, et molestie enim mollis at. Suspendisse porttitor ac dui sit amet venenatis. Etiam ullamcorper, elit porta ullamcorper laoreet, massa erat tristique ligula, vel gravida nunc risus nec ante. Vestibulum fringilla ex eu purus ultricies dictum. Nam at dui quis libero convallis lobortis.', new Date()),
      new FzChatMessage(userId, companionId, 'my simple message', new Date)
    ];
    let chat:FzChat = {
      userId: userId,
      companionId: companionId,
      companionAvatarUrl: 'https://via.placeholder.com/80x50',
      chatName:  this.getChatName(userId,companionId),
      messages:  messages
    };
    const chats = JSON.parse(localStorage.getItem(FzChatService.CHAT_UNS )) || {};
    chats[this.getChatId(userId, companionId)] = chat;
    localStorage.setItem(FzChatService.CHAT_UNS, JSON.stringify(chats));
  }


  private getChatName(userId: number, companionId: number) {
    return `${this.userService.getUserNameById(userId)}&${this.userService.getUserNameById(companionId)}`;
  }


  private isHostMessage(message: FzChatMessage, companionId: number) {
    return message.ownerId === companionId;
  }

}
