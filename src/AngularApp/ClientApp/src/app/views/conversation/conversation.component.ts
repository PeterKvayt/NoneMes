import { Component, OnInit } from '@angular/core';
import { NavMenuItem } from 'src/app/componentClasses/NavMenuItem';
import { MessageViewModel } from 'src/app/models/MessageViewModel';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/MessageService';
import { SendMessageViewModel } from 'src/app/models/SendMessageViewModel';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  providers: [MessageService]
})
export class ConversationComponent extends BaseView implements OnInit {

  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private service: MessageService) {
    super(router);
  }

  public navItems = [
    new NavMenuItem('Messages', 'messages'),
    new NavMenuItem('Logout', '#'),
  ];

  public messages: MessageViewModel[];

  public recipientId: string;

  ngOnInit() {
    this.subscriptions.add(
      this.activeRoute.params.subscribe(
        params => {
          this.recipientId = params['id'];
          this.GetConversation();
        },
        error => { console.log(error); }
      )
    );
  }

  private GetConversation(): void {
    this.subscriptions.add(
      this.service.getConversationMessages(this.recipientId).subscribe(
        (response: MessageViewModel[]) => { this.messages = response; },
        error => { console.log(error); }
      )
    );
  }

  public messageContext: string;

  public onSendClick(): void {

    const message = new SendMessageViewModel(this.messageContext, this.recipientId);
    console.log(message);
    console.log(message.dateSent.toString());
    this.messageContext = '';
    this.subscriptions.add(
      this.service.sendMessage(message).subscribe(
        response => { 
          console.log(response);
          this.messages.push(new MessageViewModel(message.context, message.dateSent, true)); },
        error => { console.log(error); }
      )
    );
  }

}
