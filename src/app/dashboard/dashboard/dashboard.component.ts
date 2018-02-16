import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { User } from "../../models/User";
import { FirebaseService } from '../../services/firebase/firebase.service';


class stats {
  max: number;
  min: number;
  avg: number;
  nbOfCoffee: number;
  nbOfQuestionMark: number;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  public isLoading: boolean;

  public sessionId: string;

  public isRevealed: boolean;

  public userlist: Array<User> = [];
  public stats: stats = {max:0,min:0,avg:0,nbOfCoffee:0,nbOfQuestionMark:0};

  public refreshInterval$: ISubscription;

  constructor(
    private _route: ActivatedRoute,
    private _fireSrvc: FirebaseService
  ) {}

  get isReadyToReveal() {
    return !this.userlist.some(u => !u.isFrozen);
  }

  ngOnInit() {
    this._route.params.subscribe(
      (routeData: Params) => {
        this.sessionId = routeData.sid;
        this.refreshUserList();
        this.isLoading = true;
      },
      err => console.error(err),
      () => (this.isLoading = true)
    );

    this.refreshInterval$ = Observable.interval(118000).subscribe(() =>
      this.refreshUserList()
    );

    this.isRevealed = false;
  }

  refreshUserList() {
    this._fireSrvc.getUserListForSession(this.sessionId).subscribe(resp => {
      const usernames = Object.keys(resp);
      this.userlist = usernames.map(username =>
        Object.assign({ username }, resp[username])
      );
    });
  }

  revealVotes(evt: Event) {
    evt.preventDefault();

    if (!this.isReadyToReveal) {
      return;
    }
    this.setStats();
    this.isRevealed = !this.isRevealed;
  }

  setStats() {
    const arrOfNbOnly = this.userlist.map(u => +u.vote).filter(v => v !== NaN);

    this.stats.max = arrOfNbOnly.reduce((max, v) => Math.max(max, v));
    this.stats.min = arrOfNbOnly.reduce((min, v) => Math.min(min, v));
    this.stats.avg =
      arrOfNbOnly.reduce((tot, v) => tot + v) / arrOfNbOnly.length;
    this.stats.nbOfCoffee = this.userlist.filter(v => v.vote === "☕").length;
    this.stats.nbOfQuestionMark = this.userlist.filter(
      v => v.vote === "❓"
    ).length;
  }

  ngOnDestroy() {
    this.refreshInterval$.unsubscribe();
  }
}
