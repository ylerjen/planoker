import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ESessionActionsType, ISetRevealedStatusAction, IInitSessionStartAction } from '../actions/session.action';
import { FirebaseService } from '../services/firebase/firebase.service';
import { ISessionState } from '../stores/reducers/session/session.reducer';

@Injectable()
export class SessionEffects {

  constructor(
    private http: Http,
    private actions$: Actions,
    private _fireSrvc: FirebaseService,
) { }

@Effect()
initSessionStore$: Observable<Action> = this.actions$.pipe(
    ofType(ESessionActionsType.InitSessionStart),
    mergeMap(
        (action: IInitSessionStartAction) => this._fireSrvc.fetchSessionInfo(action.payload).pipe(
            // If successful, dispatch success action with result
            map(
                (data: any) => {
                    const sessionState: ISessionState = {
                        sessionId: action.payload,
                        isRevealed: data.isRevealed,
                        isLoading: false
                    };
                    return {
                        type: ESessionActionsType.InitSessionSuccess,
                        payload: sessionState
                    };
                }
            ),
            // If request fails, dispatch failed action
            catchError(() => of({ type: ESessionActionsType.InitSessionFailed }))
        )
    ));

    // Listen for the ESessionActionsType.SetRevealedStatus action
    @Effect()
    setRevealedStatusSessionStore$: Observable<Action> = this.actions$.pipe(
      ofType(ESessionActionsType.SetRevealedStatus),
      mergeMap(
          (action: ISetRevealedStatusAction) => this._fireSrvc.setRevealSessionState(action.payload).pipe(
              // If successful, dispatch success action with result
              map( () => ({ type: ESessionActionsType.SetRevealedStatusSuccess }) ),
              // If request fails, dispatch failed action
              catchError(() => of({ type: ESessionActionsType.SetRevealedStatusFailed }))
          )
      ));
}
