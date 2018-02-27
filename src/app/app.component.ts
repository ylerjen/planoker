import { Component, OnInit, HostListener } from '@angular/core';
import { IGlobalState } from './stores/app.state';
import { Store } from '@ngrx/store';
import { ISessionState } from './stores/reducers/session/session.reducer';
import { FirebaseService } from './services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private session: ISessionState = null;

  constructor(
    private _store: Store<IGlobalState>,
    private _fireSrvc: FirebaseService,
  ) { }

  ngOnInit() {
    this._store.select('sessionState')
      .subscribe((sessionState: ISessionState) => {
          this.session = sessionState;
      });
  }

  /**
   * listen to browser tab. If the user quit the app, remove it from the db
   * @param event the beforeunload event
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.deleteUser();
  }

  deleteUser() {
    if (this.session && this.session.sessionId && this.session.username) {
      this._fireSrvc.deleteUserFromSession(this.session.sessionId, this.session.username);
    }
  }
}
