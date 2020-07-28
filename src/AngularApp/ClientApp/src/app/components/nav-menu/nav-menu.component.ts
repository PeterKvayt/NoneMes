import { Component, Input, OnDestroy } from '@angular/core';
import { NavMenuItem } from 'src/app/componentClasses/NavMenuItem';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/AccountService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [AccountService]
})
export class NavMenuComponent implements OnDestroy {
  
  @Input() items: NavMenuItem[];

  constructor(
    private router: Router) {

  }

  private subscriptions = new Subscription();

  public onSignOutClick(): void {
    sessionStorage.removeItem('authToken');
    this.router.navigate(['']);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
