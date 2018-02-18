import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { User } from '../../models/User';
import { IGlobalState } from '../../stores/app.state';
import { initUserStore } from '../../actions/user.action';
import { FirebaseService } from '../../services/firebase/firebase.service';


class Stats {
  max: number;
  min: number;
  avg: number;
  nbOfCoffee: number;
  nbOfQuestionMark: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public isLoading: boolean;

  public sessionId: string;

  public isRevealed: boolean;

  public userlist: Array<User> = [];

  public joinUrl: string;

  private refreshInterval$: ISubscription;
  private userStoreSub$: ISubscription;

  public stats: Stats = {
    avg: 0,
    max: 0,
    min: 0,
    nbOfCoffee: 0,
    nbOfQuestionMark: 0
  };


  constructor(
    private _route: ActivatedRoute,
    private _fireSrvc: FirebaseService,
    private _store: Store<IGlobalState>
  ) { }

  get isReadyToReveal() {
    return !this.userlist.some(u => !u.isFrozen);
  }

  ngOnInit() {
    this.isLoading = true;
    this.userStoreSub$ = this._store.select('userlistState').subscribe(
      resp => {
        this.userlist = resp.userList;
        this.isLoading = resp.isLoading;
      });

    this._route.params.subscribe(
      (routeData: Params) => {
        this.sessionId = routeData.sid;
        this.refreshUserList();
        this.defineJoinUrl();
        this.isLoading = true;
      },
      err => console.error(err),
      () => (this.isLoading = true)
    );

    this.refreshInterval$ = Observable.interval(5000).subscribe(
      () => this.refreshUserList()
    );

    this.isRevealed = false;
  }

  defineJoinUrl() {
    this.joinUrl = window.location.origin + `/session/${this.sessionId}/user`;
  }

  ngOnDestroy() {
    this.refreshInterval$.unsubscribe();
    this.userStoreSub$.unsubscribe();
  }

  /**
   * Send a user list refresh request
   */
  refreshUserList() {
    this._store.dispatch(initUserStore(this.sessionId));
  }

  /**
   * Reveal all user votes on the dashboard
   * @param evt - the click event
   */
  revealVotes(evt: Event) {
    evt.preventDefault();

    if (!this.isReadyToReveal) {
      return;
    }
    this.setStats();
    this.isRevealed = !this.isRevealed;
  }

  /**
   * Set the stats according to the user votes
   */
  setStats() {
        const arrOfNbOnly = this.userlist
            .map(u => +u.vote)
            .filter(v => !Object.is(NaN, v));
        if (arrOfNbOnly.length === 0) {
            this.stats.avg = NaN;
            this.stats.max = NaN;
            this.stats.min = NaN;
        } else if (arrOfNbOnly.length === 1) {
            this.stats.avg = arrOfNbOnly[0];
            this.stats.max = arrOfNbOnly[0];
            this.stats.min = arrOfNbOnly[0];
        } else {
            this.stats.avg = arrOfNbOnly.reduce((tot, v) => tot + v) / arrOfNbOnly.length;
    this.stats.max = arrOfNbOnly.reduce((max, v) => Math.max(max, v));
    this.stats.min = arrOfNbOnly.reduce((min, v) => Math.min(min, v));
        }
    this.stats.nbOfCoffee = this.userlist.filter(v => v.vote === '☕').length;
    this.stats.nbOfQuestionMark = this.userlist.filter(
      v => v.vote === '❓'
    ).length;
  }
}
