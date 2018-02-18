import { Action } from '@ngrx/store';

import { ESessionActions, InitSessionStartAction } from '../../../actions/session.action';

export interface ISessionState {
    sessionId: string;
    username: string;
}

export const initialState: ISessionState = { sessionId: '', username: '' };

export function sessionReducer(state: ISessionState = initialState, action: Action) {
           switch (action.type) {
               case ESessionActions.InitSessionStart:
                    const actionWithPayload = action as InitSessionStartAction;
                   return Object.assign({}, actionWithPayload.payload);

               case ESessionActions.SetSessionId:
                   throw new Error('not implemented');
                   // return state;

                case ESessionActions.SetUsername:
                    throw new Error('not implemented');
                    // return state;

               default:
                   return state;
           }
       }
