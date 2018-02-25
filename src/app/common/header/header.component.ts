import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';

import { IGlobalState } from '../../stores/app.state';
import { ISessionState } from '../../stores/reducers/session/session.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public sessionId: string;

  public username: string;

  public sessionStoreSubs$: ISubscription;

  constructor(
    private _store: Store<IGlobalState>
  ) { }

  ngOnInit() {
    this.sessionStoreSubs$ = this._store
      .select('sessionState')
      .subscribe( (sessionState: ISessionState) => {
        this.sessionId = sessionState.sessionId;
        this.username = sessionState.username;
      });
  }

  ngOnDestroy(): void {
    this.sessionStoreSubs$.unsubscribe();
  }
}
