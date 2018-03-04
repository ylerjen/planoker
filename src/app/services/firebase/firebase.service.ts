import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operators/map';

import { UserUpdateCommand, JoinSessionCommand } from '../../models/FirebaseCommand';
import { User } from '../../models/User';
import { IRevealStatusCommand } from '../../models/Session';
const sessionListNode = 'sessionlist';
const userListNode = 'userlist';
const usernameNode = 'username';
const tokennameNode = 'token';

export const questionMarkValue = '❓';
export const coffeeValue = '☕';
export const votableValues = [questionMarkValue, 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, coffeeValue];

@Injectable()
export class FirebaseService {

    constructor(private _fire: AngularFireDatabase) { }

    fetchSessionList(): Observable<Object> {
        return this._fire.object(sessionListNode).valueChanges();
    }

    fetchSessionInfo(sessionId: string): Observable<Object> {
        return this._fire.object(`${sessionListNode}/${sessionId}`).valueChanges();
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
                        createdAt: Date.now(),
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
                    itemRef.update({ [opts.username]: { vote: '0' } });
                }
            );
    }

    storeUserUpdate(opts: UserUpdateCommand): Observable<User> {
        const pathToUser = `${sessionListNode}/${opts.sessionId}/${userListNode}/${opts.username}`;
        const itemRef = this._fire.object(pathToUser);
        const updatedUser = Object.assign({}, opts);
        delete updatedUser.sessionId;
        delete updatedUser.username;
        return Observable.fromPromise(itemRef.update(updatedUser))
            .map((resp: any) => {
                const user = opts; // new User(opts);
                delete user.sessionId;
                return user;
            });
    }

    getUserListForSession(sessionId: string): Observable<Object> {
        if (!sessionListNode) {
            return;
        }
        const pathToUserlist = `${sessionListNode}/${sessionId}/${userListNode}`;
        return this._fire.object(pathToUserlist).valueChanges();
    }

    setRevealSessionState(revealStateCmd: IRevealStatusCommand): Observable<void> {
        const pathToSession = `${sessionListNode}/${revealStateCmd.sessionId}`;
        const itemRef = this._fire.object(`${pathToSession}`);
        return Observable.fromPromise(itemRef.update({ isRevealed: revealStateCmd.isRevealed }));
    }

    deleteUserFromSession(sessionId: string, username: string) {
        if (!sessionId || !username) {
            return;
        }
        const pathToUser = `${sessionListNode}/${sessionId}/${userListNode}/${username}`;
        const itemRef = this._fire.object(pathToUser);
        itemRef.remove();
    }
}
