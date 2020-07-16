import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable()
export class UserRegisterService {

  constructor(private httpClient: HttpClient) { }

  private host = 'http://localhost:';

  public register(user: User) {
    console.log('User registered:');
    console.log(user);
    // const headers = { 'content-type': 'application/json'};
    // return this.httpClient.post(this.host, user, {headers});
  }
}
