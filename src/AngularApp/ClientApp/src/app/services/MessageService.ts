import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  private host = 'https://localhost:44347/api/v1/messages';

  public getAllConversations() {
    return this.httpClient.get(this.host);
  }
}
