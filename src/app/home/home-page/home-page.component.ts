import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { JoinSessionCommand } from '../../models/FirebaseCommand';
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { IGlobalState } from '../../stores/app.state';
import { initSessionStore } from '../../actions/session.action';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    public dbcontent: Observable<Object>;

    constructor(
        private _router: Router,
        private _firebSrvc: FirebaseService,
        private _store: Store<IGlobalState>,
    ) { }

    ngOnInit() {
        this.dbcontent = this._firebSrvc.fetchSessionList(); // TODO for debug only
    }

    onCreateEvent(opts: JoinSessionCommand) {
        const createSub$ = this._firebSrvc.createSessionWithUser(opts)
            .subscribe(
                (resp) => {
                    createSub$.unsubscribe();
                    this._store.dispatch(initSessionStore(opts.sessionId)); // FIXME this should be a joinSessionAction
                    this._router.navigate([`/session/${opts.sessionId}/user/${opts.username}`]);
                },
                err => alert(err)
            );
    }

    onJoinEvent(opts: JoinSessionCommand) {
        this._firebSrvc.joinSession(opts)
            .subscribe(
                (resp) => {
                    this._router.navigate([`/session/${opts.sessionId}/user/${opts.username}`]);
                },
                err => alert(err)
            );
    }
}
