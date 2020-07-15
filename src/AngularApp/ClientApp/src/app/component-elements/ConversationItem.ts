export class ConversationItem {

  constructor(userName: string, userId: string) {
    this.userName = userName;
    this.reference = '/' + userId;
  }

  public userName: string;

  public reference: string;
}
