import { Component, OnInit } from '@angular/core';
import { NavMenuItem } from 'src/app/component-elements/NavMenuItem';
import { ConversationItem } from 'src/app/component-elements/ConversationItem';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {

  constructor() { }

  public navItems = [
    new NavMenuItem('Logout', '#')
  ];

  // Mock elements.
  public conversationItems = [
    new ConversationItem('John Doe 1', '1'),
    new ConversationItem('John Doe 2', '2'),
    new ConversationItem('John Doe 3', '3'),
    new ConversationItem('John Doe 4', '4'),
  ];

  ngOnInit() {
  }

}
