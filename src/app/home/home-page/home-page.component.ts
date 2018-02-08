import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { JoinSessionCommand } from '../../models/FirebaseCommand';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public dbcontent: Observable<Object>;

  constructor(
    private _router: Router,
    private _firebSrvc: FirebaseService
  ) { }

  ngOnInit() {
    this.dbcontent = this._firebSrvc.fetchSessionList(); // 'session1');
  }

  onJoinEvent(opts: JoinSessionCommand) {
    this._firebSrvc.joinSession(opts)
      .subscribe(
        (resp) => {
          console.log(resp);
          this._router.navigate([`/session/${opts.sessionId}/user/${opts.username}`]);
        },
        (err) => console.error(err)
      );
  }
}
