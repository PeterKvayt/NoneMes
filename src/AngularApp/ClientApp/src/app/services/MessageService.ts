import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SendMessageViewModel } from '../models/SendMessageViewModel';

@Injectable()
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  private host = 'https://localhost:44347/api/v1/messages';

  private token = 'Bearer ' + sessionStorage.getItem('authToken');
  private headOptions =  new HttpHeaders().set('Authorization', this.token);

  public getAllConversations() {
    return this.httpClient.get(this.host, { headers:  this.headOptions});
  }

  public getConversationMessages(participantId: string) {
    return this.httpClient.get(this.host + '/' + participantId, { headers: this.headOptions});
  }

  public sendMessage(message: SendMessageViewModel) {
    return this.httpClient.post(this.host, message, { headers: this.headOptions});
  }

  public getUserIdFromLogin(userLogin: string) {
    return this.httpClient.get(this.host + '/getUserId/' + userLogin, { headers: this.headOptions, responseType: 'text' });
  }
}
