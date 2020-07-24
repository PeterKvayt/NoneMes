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
    private service: AccountService,
    private router: Router) {

  }

  private subscriptions = new Subscription();

  public onSignOutClick(): void {
    this.subscriptions.add(
      this.service.signOut().subscribe(
        response => { this.router.navigate(['']); },
        error => { console.log(error); }
      )
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
