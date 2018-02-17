import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  INIT_USER_STORE_START,
  INIT_USER_STORE_SUCCESS,
  INIT_USER_STORE_FAILED,
  ADD_USER,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UpdateUserAction,
} from '../actions/user.action';
import { FirebaseService } from '../services/firebase/firebase.service';

@Injectable()
export class UserEffects {

  constructor(
    private http: Http,
    private actions$: Actions,
    private _fireSrvc: FirebaseService,
  ) { }

  // Listen for the INIT_USER_STORE_START action
  @Effect() initUserStore$: Observable<Action> = this.actions$.pipe(
    ofType(INIT_USER_STORE_START),
    mergeMap(
      action => {
        // alert(ADD_USER);
        return this._fireSrvc.getUserListForSession('dasga'/*action.payload*/).pipe(
          // If successful, dispatch success action with result
          map(data => {
            // convert object to array
            const usernames = Object.keys(data);
            const userlist = usernames.map(username =>
              Object.assign({ username }, data[username])
            );
            return { type: INIT_USER_STORE_SUCCESS, payload: userlist };
          }),
          // If request fails, dispatch failed action
          catchError(() => of({ type: INIT_USER_STORE_FAILED }))
        );
    })
  );

  // Listen for the UPDATE_USER_START action
  @Effect() updateUserStore$: Observable<Action> = this.actions$.pipe(
    ofType(UPDATE_USER_START),
    mergeMap(
      (action: UpdateUserAction) => this._fireSrvc.storeUserUpdate(action.payload).pipe(
          // If successful, dispatch success action with result
          map(data => ({ type: UPDATE_USER_SUCCESS, payload: data })),
          // If request fails, dispatch failed action
          catchError(() => of({ type: INIT_USER_STORE_FAILED }))
      )
    )
  );

  // Listen for the 'ADD_USER' action
  @Effect() addUser$: Observable<Action> = this.actions$.pipe(
    ofType(ADD_USER),
    mergeMap(
      action => {
        // alert(ADD_USER);
        return this.http.get('/').pipe(
          // If successful, dispatch success action with result
          map(data => ({ type: 'LOGIN_SUCCESS', payload: data })),
          // If request fails, dispatch failed action
          catchError(() => of({ type: 'LOGIN_FAILED' }))
        );
    })
  );

}
