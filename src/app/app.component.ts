import { Component } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-pwa';
  offlineEvent: Observable<Event> | undefined;
  onlineEvent: Observable<Event> | undefined;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.handleAppConnectivityChanges();
  }

  private handleAppConnectivityChanges(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      // handle online mode
      console.log('Online...');
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      // handle offline mode
      console.log('Offline...');
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
