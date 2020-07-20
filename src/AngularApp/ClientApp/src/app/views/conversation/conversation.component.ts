import { Component, OnInit } from '@angular/core';
import { NavMenuItem } from 'src/app/componentClasses/NavMenuItem';
import { Message } from 'src/app/componentClasses/Messsage';
import { BaseView } from 'src/app/BaseClasses/BaseView';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent extends BaseView implements OnInit {

  constructor(
    public router: Router) {
    super(router);
  }

  public navItems = [
    new NavMenuItem('Messages', 'messages'),
    new NavMenuItem('Logout', '#'),
  ];

  // Mock messages: should be sort by date and time,
  // true means own messages, false - companion.
  public messages = [
    new Message('Hello world', '11:25', true),
    new Message('Hello idiot', '11:28', false),
  ];

  ngOnInit() {
  }

}
