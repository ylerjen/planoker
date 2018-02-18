import { Action } from '@ngrx/store';
import { ISessionState } from '../stores/reducers/session/session.reducer';

export interface InitSessionStartAction extends Action {
    payload: ISessionState;
}

export enum ESessionActions {
    InitSessionStart = 'InitSessionStart',
    SetUsername = 'SET_USERNAME',
    SetSessionId = 'SET_SESSION_ID',
}

export function initSessionStore(payload: ISessionState): InitSessionStartAction {
    return {
        type: ESessionActions.InitSessionStart,
        payload
    };
}
