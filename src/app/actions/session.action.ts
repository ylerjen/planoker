import { Action } from '@ngrx/store';
import { IRevealStatusCommand } from '../models/Session';
import { ISessionState } from '../stores/reducers/session/session.reducer';

export interface IInitSessionStartAction extends Action {
    payload: string;
}

export interface IInitSessionSuccessAction extends Action {
    payload: ISessionState;
}

export interface ISetSessionIdOrUsernameAction extends Action {
    payload: string;
}
export interface ISetRevealedStatusAction extends Action {
    payload: IRevealStatusCommand;
}

export enum ESessionActionsType {
    InitSessionStart = 'InitSessionStart',
    InitSessionSuccess = 'InitSessionSuccess',
    InitSessionFailed = 'InitSessionFailed',
    SetUsername = 'SetUsername',
    SetSessionId = 'SetSessionId',
    SetRevealedStatus = 'SetRevealedStatus',
    SetRevealedStatusSuccess = 'SetRevealedStatusSuccess',
    SetRevealedStatusFailed = 'SetRevealedStatusFailed'
}

export function initSessionStore(payload: string): IInitSessionStartAction {
    return {
        type: ESessionActionsType.InitSessionStart,
        payload
    };
}

export function setSessionId(sessionId: string) {
    return {
        type: ESessionActionsType.SetSessionId,
        payload: sessionId
    };
}

export function setSessionUsername(username: string) {
    return {
        type: ESessionActionsType.SetUsername,
        payload: username
    };
}

export function setRevealStatus(revealCmd: IRevealStatusCommand) {
    return {
        type: ESessionActionsType.SetRevealedStatus,
        payload: revealCmd
    };
}
