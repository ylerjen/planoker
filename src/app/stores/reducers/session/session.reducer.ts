import { Action } from '@ngrx/store';

import {
    ESessionActionsType,
    IInitSessionStartAction,
    ISetSessionIdOrUsernameAction,
    ISetRevealedStatusAction,
    IInitSessionSuccessAction,
} from '../../../actions/session.action';

export interface ISessionState {
    sessionId: string;
    username?: string;
    isRevealed?: boolean;
    isLoading: false;
}

export const initialState: ISessionState = {
    sessionId: '',
    username: '',
    isRevealed: false,
    isLoading: false,
};

export function sessionReducer(state: ISessionState = initialState, action: Action) {
    switch (action.type) {
        case ESessionActionsType.InitSessionStart:
            const actionWithPayload = action as IInitSessionStartAction;
            return Object.assign({}, state, { isLoading: true });

        case ESessionActionsType.InitSessionSuccess:
            const curAction = action as IInitSessionSuccessAction;
            return Object.assign({}, state, curAction.payload, { isLoading: false });

        case ESessionActionsType.SetSessionId:
            const actionWithIdPayload = action as ISetSessionIdOrUsernameAction;
            return Object.assign({}, state, { sessionId: actionWithIdPayload.payload });

        case ESessionActionsType.SetUsername:
            const actionWithUsernamePayload = action as ISetSessionIdOrUsernameAction;
            return Object.assign({}, state, { username: actionWithUsernamePayload.payload });

        case ESessionActionsType.SetRevealedStatus:
            const actionWithRevealStatusPayload = action as ISetRevealedStatusAction;
            return Object.assign({}, state, { isRevealed: actionWithRevealStatusPayload.payload });

        case ESessionActionsType.SetRevealedStatusSuccess:
        case ESessionActionsType.InitSessionFailed:
        case ESessionActionsType.SetRevealedStatusFailed:
            return Object.assign({}, state, { isLoading: false });

        default:
            return state;
    }
}
