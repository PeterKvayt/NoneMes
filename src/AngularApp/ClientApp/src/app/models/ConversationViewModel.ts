export class ConversationViewModel {

  constructor(userName: string, userId: string) {
    this.userName = userName;
    this.userId = '/' + userId;
  }

  public userName: string;

  public userId: string;
}
