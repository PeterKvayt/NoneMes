import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable()
export class UserRegisterService {

  constructor(private httpClient: HttpClient) { }

  private host = 'https://localhost:44347/api/accounts  ';

  public register(model: User) {
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post(this.host, model, {headers});
  }
}
