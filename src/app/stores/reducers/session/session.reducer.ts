import { Action } from '@ngrx/store';

import {
    ESessionActions,
    IInitSessionStartAction,
    ISetSessionIdOrUsernameAction,
    ISetRevealedStatusAction
} from '../../../actions/session.action';


export interface ISessionState {
    sessionId: string;
    username: string;
    isRevealed?: boolean;
}

export const initialState: ISessionState = {
    sessionId: '',
    username: '',
    isRevealed: false
};

export function sessionReducer(state: ISessionState = initialState, action: Action) {
    switch (action.type) {
        case ESessionActions.InitSessionStart:
            const actionWithPayload = action as IInitSessionStartAction;
            return Object.assign({}, actionWithPayload.payload);

        case ESessionActions.SetSessionId:
            const actionWithIdPayload = action as ISetSessionIdOrUsernameAction;
            return Object.assign({}, state, { sessionId: actionWithIdPayload.payload });

        case ESessionActions.SetUsername:
            const actionWithUsernamePayload = action as ISetSessionIdOrUsernameAction;
            return Object.assign({}, state, { username: actionWithUsernamePayload.payload });

        case ESessionActions.SetRevealedStatus:
            const actionWithRevealStatusPayload = action as ISetRevealedStatusAction;
            return Object.assign({}, state, { isRevealed: actionWithRevealStatusPayload.payload });

        default:
            return state;
    }
}
