import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class BaseView implements OnDestroy {

  public subscriptions = new Subscription();

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}