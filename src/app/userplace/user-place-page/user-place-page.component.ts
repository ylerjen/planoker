import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { VoteCommand } from '../../models/FirebaseCommand';
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
export class UserPlacePageComponent implements OnInit {

  public selectOptions = conversionObj;
 
  public isConfirmed: boolean;
 
  public isPageReady: boolean;

  public selectedValue = conversionObj['?'];
  private sessionId = '';
  private username = '';

  constructor(
    private _route: ActivatedRoute,
    private _fireSrvc: FirebaseService
  ) {}

  ngOnInit() {
    console.log('oninit');
    this._route.params
      .subscribe(
        (routeData: Params) => {

    console.log('oninit ok ', routeData);
          this.sessionId = routeData.sid;
          this.username = routeData.uid;
          this.isPageReady = true;
        },
        (err) => console.error(err),
        () => this.isPageReady = true
    );
  }

  onClickConfirmation($event: Event) {
    const voteCmd: VoteCommand = {
      username: this.username,
      sessionId: this.sessionId,
      vote: this.selectedValue
    };
    this._fireSrvc.storeVote(voteCmd);
    this.isConfirmed = true;
  }

  selectionChanged(evt: Event) {
    this.isConfirmed = false;
    const selectEl = evt.target as HTMLSelectElement;
    this.selectedValue = conversionObj[selectEl.value];
  }
}
