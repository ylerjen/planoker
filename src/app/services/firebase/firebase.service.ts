import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operators/map';

import { JoinSessionCommand, VoteCommand } from '../../models/FirebaseCommand';
const sessionListNode = 'sessionlist';
const userListNode = 'userlist';
const usernameNode = 'username';
const tokennameNode = 'token';

@Injectable()
export class FirebaseService {

  constructor(private _fire: AngularFireDatabase) { }

  fetchSessionList(): Observable<Object> {
    return this._fire.object(sessionListNode).valueChanges();
  }

  fetchSessionInfo(sessionId: string): Observable<Object> {
    return this._fire.object(`${sessionListNode}/${sessionId}`).valueChanges();
  }

  joinSession(opts: JoinSessionCommand): Observable<void> {
    const pathToSessionId = `${sessionListNode}/${opts.sessionId}`;
    return this._fire.object(pathToSessionId).valueChanges()
      .map(
        (sessionObj: { [key: string]: any }) => {
          if (!sessionObj) {
            throw new Error(`Session ${opts.sessionId} does not exist`);
          } else {
            console.log(`session found `);
            const itemRef = this._fire.object(`${pathToSessionId}/${userListNode}`);
            itemRef.update({ [opts.username]: { token: 'change-me' } });
          }
        }
      );
  }

  storeVote(opts: VoteCommand) {
    const pathToUser = `${sessionListNode}/${opts.sessionId}/${userListNode}/${opts.username}`;
    const itemRef = this._fire.object(pathToUser);
    itemRef.update({ vote: opts.vote, isFrozen: opts.isFrozen });
  }

  getUserListForSession(sessionId: string): Observable<Object> {
    if (!sessionListNode) {
      return;
    }
    const pathToUserlist = `${sessionListNode}/${sessionId}/${userListNode}`;
    return this._fire.object(pathToUserlist).valueChanges();
  }

}
