import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { IUserlistState } from '../../stores/reducers/userlist/userlist.reducer';
import { initUserStore } from '../../actions/user.action';
import { initSessionStore } from '../../actions/session.action';
import { IGlobalState } from '../../stores/app.state';
import { VoteCommand } from '../../models/FirebaseCommand';
import { User } from '../../models/User';
import { Session } from '../../models/Session';
import { FirebaseService, votableValues } from '../../services/firebase/firebase.service';

@Component({
    selector: 'app-user-place-page',
    templateUrl: './user-place-page.component.html',
    styleUrls: ['./user-place-page.component.scss']
})
export class UserPlacePageComponent implements OnInit, OnDestroy {
    public selectOptions = votableValues;

    public currUser = new User();

    public isPageReady: boolean;

    public selectedValue: string;

    public selectableValues = votableValues;

    private session: Session;

    private _userlistStoreSubs$: ISubscription;

    constructor(
        private _route: ActivatedRoute,
        private _fireSrvc: FirebaseService,
        private _store: Store<IGlobalState>
    ) { }

    ngOnInit() {
        this._userlistStoreSubs$ = this._store
            .select('userlistState')
            .subscribe(resp => {
                this.refreshValuesFromStore(resp);
            });
        this._route.params
            .subscribe(
                (routeData: Params) => {
                    this.session = new Session({
                        sessionId: routeData.sid,
                        username: routeData.uid
                    });
                    this._store.dispatch(initUserStore(this.session.sessionId));
                    this._store.dispatch(initSessionStore({
                        sessionId: this.session.sessionId,
                        username: this.session.username,
                    }));
                    this.isPageReady = true;
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
    refreshValuesFromStore(val: IUserlistState) {
        console.log('refresh from store', val);
        if (val && val.userList && this.currUser) {
            const currUser = val.userList.find(u => u.username === this.session.username);
            if (currUser) {
                this.currUser = currUser;
                this.selectedValue = currUser.vote;
                this.isPageReady = true;
            }
        }
    }

    onClickFreeze($event: Event) {
        this.currUser.isFrozen = !this.currUser.isFrozen;
        const voteCmd: VoteCommand = {
            username: this.session.username,
            sessionId: this.session.sessionId,
            vote: this.selectedValue,
            isFrozen: this.currUser.isFrozen
        };
        this._fireSrvc.storeUserUpdate(voteCmd);
    }

    selectionChanged(evt: Event) {
        const selectEl = evt.target as HTMLSelectElement;
        this.selectedValue = votableValues[selectEl.value];
    }
}
