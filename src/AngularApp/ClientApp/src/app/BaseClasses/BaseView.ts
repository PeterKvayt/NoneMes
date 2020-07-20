import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

export class BaseView implements OnDestroy {

  constructor(
    public router: Router
  ) { }

  public subscriptions = new Subscription();

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public redirect(route: string): void {
    this.router.navigate([route]);
  }
}