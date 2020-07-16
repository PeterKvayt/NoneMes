import { Component, OnInit } from '@angular/core';
import { NavMenuItem } from 'src/app/componentClasses/NavMenuItem';
import { ConversationItem } from 'src/app/componentClasses/ConversationItem';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor() { }

  public navItems = [
    new NavMenuItem('Logout', '#')
  ];

  // Mock elements.
  public messageItems = [
    new ConversationItem('John Doe 1', '1'),
    new ConversationItem('John Doe 2', '2'),
    new ConversationItem('John Doe 3', '3'),
    new ConversationItem('John Doe 4', '4'),
  ];

  ngOnInit() {
  }

}
