export class SendMessageViewModel {
  constructor(context: string, recipientUserId: string) {
    this.context = context;
    this.dateSent = new Date();
    this.recipientUserId = recipientUserId;
  }

  public context: string;
  
  public dateSent: Date;
  
  public recipientUserId: string; 
}