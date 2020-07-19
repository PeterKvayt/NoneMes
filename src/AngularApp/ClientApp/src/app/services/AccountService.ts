import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserModel } from '../models/User';

@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  private host = 'https://localhost:44347/api/accounts/register';

  public register(model: RegisterUserModel) {
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post(this.host, model, {headers});
  }

  public signIn(model: RegisterUserModel) {
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post(this.host, model, {headers});
  }
}
