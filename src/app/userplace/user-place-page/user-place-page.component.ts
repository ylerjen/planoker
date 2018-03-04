import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { IUserlistState } from '../../stores/reducers/userlist/userlist.reducer';
import { ISessionState } from '../../stores/reducers/session/session.reducer';
import { initUserStore } from '../../actions/user.action';
import { initSessionStore, setSessionUsername } from '../../actions/session.action';
import { IGlobalState } from '../../stores/app.state';
import { UserUpdateCommand } from '../../models/FirebaseCommand';
import { User } from '../../models/User';
import { Session } from '../../models/Session';
import { FirebaseService, votableValues, questionMarkValue } from '../../services/firebase/firebase.service';

@Component({
    selector: 'app-user-place-page',
    templateUrl: './user-place-page.component.html',
    styleUrls: ['./user-place-page.component.scss']
})
export class UserPlacePageComponent implements OnInit, OnDestroy {

    public selectOptions = votableValues;

    public currUser = new User();

    public selectedValue: string = questionMarkValue;

    public selectableValues = votableValues;

    public session: ISessionState;

    private _userList: Array<User> = [];
    private _userlistStoreSubs$: ISubscription;
    private _sessionStoreSubs$: ISubscription;

    constructor(
        private _route: ActivatedRoute,
        private _fireSrvc: FirebaseService,
        private _store: Store<IGlobalState>
    ) { }

    ngOnInit() {
        this._userlistStoreSubs$ = this._store
            .select('sessionState')
            .subscribe((sessionState: ISessionState) => {
                this.session = sessionState;
                this.refreshValuesFromStore();
            });
        this._sessionStoreSubs$ = this._store
            .select('userlistState')
            .subscribe(resp => {
                this._userList = resp.userList;
                this.refreshValuesFromStore();
            });
        this._route.params
            .subscribe(
                (routeData: Params) => {
                    const sessionId = routeData.sid;
                    const username = routeData.uid;
                    this._store.dispatch(setSessionUsername(username));
                    this._store.dispatch(initUserStore(sessionId));
                    this._store.dispatch(initSessionStore(sessionId));
                },
                err => console.error(err)
            );
    }

    ngOnDestroy() {
        this._userlistStoreSubs$.unsubscribe();
    }

    /**
     * refresh the values of the component with the actual value from the store
     * @param val - the current userlist state from the store
     */
    refreshValuesFromStore() {
        if ( !(this.session.sessionId && this.session.username)) {
            return;
        }
        const currUser = this._userList.find(u => u.username === this.session.username);
        if (!currUser) {
            return;
        }
        if (currUser.vote === '') {
            currUser.vote = questionMarkValue;
        }
        this.currUser = currUser;
        this.selectedValue = currUser.vote;
    }

    onClickFreeze($event: Event) {
        this.currUser.isFrozen = !this.currUser.isFrozen;
        const voteCmd: UserUpdateCommand = new UserUpdateCommand({
            username: this.session.username,
            sessionId: this.session.sessionId,
            vote: this.selectedValue,
            isFrozen: this.currUser.isFrozen
        });
        this._fireSrvc.storeUserUpdate(voteCmd);
    }

    selectionChanged(evt: Event) {
        const selectEl = evt.target as HTMLSelectElement;
        this.selectedValue = selectEl.value;
    }
}
