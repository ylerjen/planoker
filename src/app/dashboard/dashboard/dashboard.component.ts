import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { FirebaseService } from '../../services/firebase/firebase.service';
import { query } from '@angular/core/src/render3/instructions';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public isLoading: boolean;

  public sessionId: string;

  public userlist: Array<Object> = [];

  public refreshInterval$: ISubscription;

  constructor(
    private _route: ActivatedRoute,
    private _fireSrvc: FirebaseService
  ) { }

    ngOnInit() {
      this._route.params
        .subscribe(
          (routeData: Params) => {
            this.sessionId = routeData.sid;
            this.refreshUserList();
            this.isLoading = true;
          },
          (err) => console.error(err),
          () => this.isLoading = true
      );

      this.refreshInterval$ = Observable.interval(500)
        .subscribe(() => this.refreshUserList());
    }

    refreshUserList() {
      this._fireSrvc.getUserListForSession(this.sessionId)
        .subscribe(resp => {
          const usernames = Object.keys(resp);
          console.log(resp);
          this.userlist =  usernames.map(
            username => (Object.assign({ username }, resp[username]))
          );
        });
    }

    ngOnDestroy() {
      this.refreshInterval$.unsubscribe();
     }
}
