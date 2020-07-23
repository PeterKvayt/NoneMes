import { Component, OnInit } from '@angular/core';
import { NavMenuItem } from 'src/app/componentClasses/NavMenuItem';
import { MessageViewModel } from 'src/app/models/MessageViewModel';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/MessageService';

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
    
  ngOnInit() {
    this.subscriptions.add(
      this.activeRoute.params.subscribe(
        params => {
          const id = params['id'];
          this.GetConversation(id);
        },
        error => { console.log(error); }
      )
    );
  }

  private GetConversation(participantId: string): void {
    this.subscriptions.add(
      this.service.getConversationMessages(participantId).subscribe(
        (response: MessageViewModel[]) => { this.messages = response; },
        error => { console.log(error); }
      )
    );
  }

}
