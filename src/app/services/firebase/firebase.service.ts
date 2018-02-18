import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operators/map';

import { JoinSessionCommand, VoteCommand } from '../../models/FirebaseCommand';
import { User } from '../../models/User';
const sessionListNode = 'sessionlist';
const userListNode = 'userlist';
const usernameNode = 'username';
const tokennameNode = 'token';

export const votableValues = ['❓', 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, '☕'];

@Injectable()
export class FirebaseService {

    constructor(private _fire: AngularFireDatabase) { }

    fetchSessionList(): Observable<Object> {
        return this._fire.object(sessionListNode).valueChanges();
    }

    fetchSessionInfo(sessionId: string): Observable<Object> {
        return this._fire.object(`${sessionListNode}/${sessionId}`).valueChanges();
    }

    fetchUserInfo(sessionId: string, username: string): Observable<User> {
        return this._fire
            .object(
            `${sessionListNode}/${sessionId}/${userListNode}/${username}`
            )
            .valueChanges()
            .map(userValues => {
                const u = new User(userValues);
                u.username = username;
                return u;
            });
    }

    createSessionWithUser(opts: JoinSessionCommand): Observable<void> {
        const pathToSessionList = `${sessionListNode}`;
        return this._fire.object(pathToSessionList).valueChanges()
            .map(
                (sessionListObj: { [key: string]: any }) => {
                    if (sessionListObj[opts.sessionId]) {
                        throw new Error(`Session ${opts.sessionId} already exist`);
                    }
                    const itemRef = this._fire.object(`${pathToSessionList}/${opts.sessionId}`);
                    const sessionInitialObj = {
                        isRevealed: false,
                        [`userlist/${opts.username}/isFrozen`]: false
                    };
                    itemRef.update(sessionInitialObj);
                }
            );
    }

    joinSession(opts: JoinSessionCommand): Observable<void> {
        const pathToSessionId = `${sessionListNode}/${opts.sessionId}`;
        return this._fire.object(pathToSessionId).valueChanges()
            .map(
                (sessionObj: { [key: string]: any }) => {
                    if (!sessionObj) {
                        throw new Error(`Session ${opts.sessionId} does not exist`);
                    }
                    console.log(`session found`);
                    const itemRef = this._fire.object(`${pathToSessionId}/${userListNode}`);
                    itemRef.update({ [opts.username]: { token: 'change-me' } });
                }
            );
    }

    storeUserUpdate(opts: VoteCommand): Observable<void> {
        const pathToUser = `${sessionListNode}/${opts.sessionId}/${userListNode}/${opts.username}`;
        const itemRef = this._fire.object(pathToUser);
        return Observable.fromPromise(itemRef.update({ vote: opts.vote, isFrozen: opts.isFrozen }));
    }

    getUserListForSession(sessionId: string): Observable<Object> {
        if (!sessionListNode) {
            return;
        }
        const pathToUserlist = `${sessionListNode}/${sessionId}/${userListNode}`;
        return this._fire.object(pathToUserlist).valueChanges();
    }

}
