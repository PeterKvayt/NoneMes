import { Component, Input } from '@angular/core';
import { NavMenuItem } from 'src/app/component-elements/NavMenuItem';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  
  @Input() items: NavMenuItem[];
}
