import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendMessageViewModel } from '../models/SendMessageViewModel';

@Injectable()
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  private host = 'https://localhost:44347/api/v1/messages';

  public getAllConversations() {
    return this.httpClient.get(this.host);
  }

  public getConversationMessages(participantId: string) {
    return this.httpClient.get(this.host + '/' + participantId);
  }

  public sendMessage(message: SendMessageViewModel) {
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post(this.host, message, {headers});

  }
}
