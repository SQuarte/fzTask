import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {ChatMessage} from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  private static CHAT_UNS = 'FZ_CHAT';

  getMessages(userId: number, companionId: number): Observable<ChatMessage[]> {
    const chatId = this.getChatId(userId, companionId);
    const chatMessages = this.getChatMessagesFromLocalStore(chatId);
    if (!chatMessages || !chatMessages.length) {
      this.initMessages(userId, companionId);
    }
    return of(this.getChatMessagesFromLocalStore(chatId));
  }

  addMessage(ownerId: number, companionId: number, message: string): Observable<ChatMessage[]> {
    const chatId = this.getChatId(ownerId, companionId);
    return of(
        this.saveToLocalStore(chatId, new ChatMessage(ownerId, companionId, message, new Date()))
    );
  }

  private initMessages(userId: number, companionId: number) {
    const messages = [
        new ChatMessage(companionId, userId, 'Simple message 1', new Date()),
        new ChatMessage(companionId, userId, 'Simple message 2', new Date()),
        new ChatMessage(companionId, userId, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent scelerisque non sapien ut efficitur. Aenean suscipit suscipit metus, in luctus est eleifend quis. Pellentesque ex libero, volutpat luctus dignissim sed, commodo vel eros. Sed mattis nisl in justo accumsan scelerisque. Nulla ullamcorper posuere diam, et molestie enim mollis at. Suspendisse porttitor ac dui sit amet venenatis. Etiam ullamcorper, elit porta ullamcorper laoreet, massa erat tristique ligula, vel gravida nunc risus nec ante. Vestibulum fringilla ex eu purus ultricies dictum. Nam at dui quis libero convallis lobortis.', new Date()),
        new ChatMessage(userId, companionId, 'my simple message', new Date)
    ];
    const chats = JSON.parse(localStorage.getItem(ChatService.CHAT_UNS )) || {};
    chats[this.getChatId(userId, companionId)] = messages;
    localStorage.setItem(ChatService.CHAT_UNS, JSON.stringify(chats));
  }

  private saveToLocalStore(chatId: string, message: ChatMessage): ChatMessage[] {
    const chats = JSON.parse(localStorage.getItem(ChatService.CHAT_UNS )) || {};
    const chat = chats[chatId] || [];
    chat.push(message);
    chats[chatId] = chat;
    localStorage.setItem(ChatService.CHAT_UNS, JSON.stringify(chats));
    return chat;
  }

  private getChatMessagesFromLocalStore(chatId: string): ChatMessage[] {
    const chats = JSON.parse(localStorage.getItem(ChatService.CHAT_UNS )) || {};
    const chat = chats[chatId] || [];
    return chat;
  }

  private getChatId(ownerId: number, companionId: number): string {
    return `${ownerId}_${companionId}`;
  }
}
