export class MessageViewModel {
  constructor(text: string, time: string, owner: boolean) {
    this.text = text;
    this.time = time;
    this.owner = owner;
  }

  public text: string;
  
  public time: string;
  
  public owner: boolean;
}
