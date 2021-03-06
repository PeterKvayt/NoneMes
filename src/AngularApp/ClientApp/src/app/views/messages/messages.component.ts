import { Component, OnInit } from '@angular/core';
import { NavMenuItem } from 'src/app/componentClasses/NavMenuItem';
import { ConversationViewModel } from 'src/app/models/ConversationViewModel';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/MessageService';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessageService]
})
export class MessagesComponent extends BaseView implements OnInit {

  constructor(
    public router: Router,
    private service: MessageService) {
    super(router);
   }

  public navItems = [
    new NavMenuItem('Sign out', '#')
  ];

  public participantLogin: string;

  ngOnInit() {
    this.getConversations();
  }

  public conversations: ConversationViewModel[];

  private getConversations(): void {
    this.subscriptions.add(
      this.service.getAllConversations().subscribe(
        (response: ConversationViewModel[]) => { 
          this.conversations = response; 
          console.log(response);
        },
        error => { console.log(error); }
      )
    );
  }

  public onConversationClick(conversation: ConversationViewModel): void {
    this.redirect('conversation/' + conversation.userId);
  }

  public onSearchClick(): void {
    if (this.participantLogin !== undefined) {
      this.subscriptions.add(
        this.service.getUserIdFromLogin(this.participantLogin).subscribe(
          (response: string) => { this.redirect('conversation/' + response); },
          error => { console.log(error); }
        )
      );
    }
  }
}
