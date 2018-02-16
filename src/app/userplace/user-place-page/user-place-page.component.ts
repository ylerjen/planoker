import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import {
  IUserlistState,
  addUserAction
} from '../../stores/reducers/userlist/userlist.reducer';
import { VoteCommand } from '../../models/FirebaseCommand';
import { User } from '../../models/User';
import { Session } from '../../models/Session';
import { FirebaseService } from '../../services/firebase/firebase.service';

const conversionObj = {
  '?': '❓',
  '1': '1',
  '2': '2',
  '3': '3',
  '5': '5',
  '8': '8',
  '13': '13',
  '21': '21',
  '34': '34',
  '55': '55',
  'break': '☕',
};

@Component({
    selector: 'app-user-place-page',
    templateUrl: './user-place-page.component.html',
    styleUrls: ['./user-place-page.component.scss']
})
export class UserPlacePageComponent implements OnInit, OnDestroy {
    public selectOptions = conversionObj;

    public currUser = new User();

    public isPageReady: boolean;

    public selectedValue: string;

    private session: Session;

    private _userlistStoreSubs$;

    constructor(
        private _route: ActivatedRoute,
        private _fireSrvc: FirebaseService,
        private _store: Store<IUserlistState>
    ) {}

    ngOnInit() {
        this._route.params
          .switchMap((routeData: Params) => {
            this.session = new Session({
              sessionId: routeData.sid,
              username: routeData.uid
            });
            return this._fireSrvc.fetchUserInfo(this.session.sessionId, this.session.username);
          })
          .subscribe(
            resp => this._store.dispatch(addUserAction(resp)),
            err => console.error(err)
          );

        this._userlistStoreSubs$ = this._store
          .select('userlistState')
          .subscribe(resp => {
            this.refreshValuesFromStore(resp);
          });
    }

    refreshValuesFromStore(val: IUserlistState) {
      if (val && val.userList && this.currUser) {
        const currUser = val.userList.find(u => u.username === this.session.username);
        if (currUser) {
          this.currUser = currUser;
          this.selectedValue = currUser.vote;
          this.isPageReady = true;
        }
      }
    }

    ngOnDestroy() {
        this._userlistStoreSubs$.unsubscribe();
    }

    onClickFreeze($event: Event) {
        this.currUser.isFrozen = !this.currUser.isFrozen;
        const voteCmd: VoteCommand = {
          username: this.session.username,
          sessionId: this.session.sessionId,
          vote: this.selectedValue,
          isFrozen: this.currUser.isFrozen};
        this._fireSrvc.storeVote(voteCmd);
    }

    selectionChanged(evt: Event) {
        const selectEl = evt.target as HTMLSelectElement;
        this.selectedValue = conversionObj[selectEl.value];
    }
}
