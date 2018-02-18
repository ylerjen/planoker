import { Action } from '@ngrx/store';
import { ISessionState } from '../stores/reducers/session/session.reducer';

export interface IInitSessionStartAction extends Action {
    payload: ISessionState;
}
export interface ISetSessionIdOrUsernameAction extends Action {
    payload: string;
}
export interface ISetRevealedStatusAction extends Action {
    payload: boolean;
}

export enum ESessionActions {
    InitSessionStart = 'InitSessionStart',
    SetUsername = 'SetUsername',
    SetSessionId = 'SetSessionId',
    SetRevealedStatus = 'SetRevealedStatus',
}

export function initSessionStore(payload: ISessionState): IInitSessionStartAction {
    return {
        type: ESessionActions.InitSessionStart,
        payload
    };
}

export function setSessionId(sessionId: string) {
    return {
        type: ESessionActions.SetSessionId,
        payload: sessionId
    };
}

export function setUsername(username: string) {
    return {
        type: ESessionActions.SetUsername,
        payload: username
    };
}

export function setRevealStatus(isRevealed: boolean) {
    return {
        type: ESessionActions.SetRevealedStatus,
        payload: isRevealed
    };
}
