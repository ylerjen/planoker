import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IUserlistState } from '../../stores/reducers/userlist/userlist.reducer';
import { VoteCommand } from '../../models/FirebaseCommand';
import { User } from '../../models/User';
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

    public currUser: User;

    public isPageReady: boolean;

    public selectedValue = conversionObj['?'];

    private sessionId = '';

    private _userlistStoreSubs$;

    constructor(
        private _route: ActivatedRoute,
        private _fireSrvc: FirebaseService,
        private _store: Store<IUserlistState>
    ) {}

    ngOnInit() {
        this._userlistStoreSubs$ = this._store
            .select('userlistState')
            .subscribe(refreshValuesFromStore);
        this._route.params.subscribe(
            (routeData: Params) => {
                console.log('oninit ok ', routeData);
                this.sessionId = routeData.sid;
                this.currUser.username = routeData.uid;
                this.isPageReady = true;
            },
            err => console.error(err),
            () => (this.isPageReady = true)
        );
    }

    refreshValuesFromStore(val: IUserlistState) {
        const currUser = val.userList[this.currUser.username];
        currUser.username = this.currUser.username;
        this.currUser = currUser;
    }

    ngOnDestroy() {
        this._userlistStoreSubs$.unsubscribe();
    }

    onClickFreeze($event: Event) {
        this.currUser.isFrozen = !this.currUser.isFrozen;
        const voteCmd: VoteCommand = {
          username: this.currUser.username,
          sessionId: this.sessionId,
          vote: this.selectedValue,
          isFrozen: this.currUser.isFrozen};
        this._fireSrvc.storeVote(voteCmd);
    }

    selectionChanged(evt: Event) {
        const selectEl = evt.target as HTMLSelectElement;
        this.selectedValue = conversionObj[selectEl.value];
    }
}
