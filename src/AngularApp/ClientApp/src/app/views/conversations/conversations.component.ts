import { Component, OnInit } from '@angular/core';
import { NavMenuItem } from 'src/app/component-elements/NavMenuItem';

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

  ngOnInit() {
  }

}
