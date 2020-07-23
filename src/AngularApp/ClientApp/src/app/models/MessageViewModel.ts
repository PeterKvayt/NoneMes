export class MessageViewModel {
  constructor(context: string, dateSent: string, owner: boolean) {
    this.context = context;
    this.dateSent = dateSent;
    this.owner = owner;
  }

  public context: string;
  
  public dateSent: string;
  
  public owner: boolean;
}
