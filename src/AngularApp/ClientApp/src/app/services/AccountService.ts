import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserModel } from '../models/RegisterUserModel';

@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  private host = 'https://localhost:44347/api/accounts/';

  public register(model: RegisterUserModel) {
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post(this.host + 'register', model, {headers});
  }

  public signIn(model: RegisterUserModel) {
    const headers = { 'content-type': 'application/json'};
    return this.httpClient.post(this.host + 'login', model, {headers});
  }
}
