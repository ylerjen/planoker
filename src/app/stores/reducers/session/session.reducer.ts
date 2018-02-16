import { Action } from '@ngrx/store';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_SESSION_ID = 'SET_SESSION_ID';
export interface ISessionState {
    sessionId: string;
    username: string;
}

export const initialState: ISessionState = { sessionId: '', username: '' };

export function sessionReducer(state: ISessionState = initialState, action: Action) {
           switch (action.type) {
               case SET_SESSION_ID:
                   throw new Error('not implemented');
                   // return state;

               case SET_USERNAME:
                   throw new Error('not implemented');
                   // return state;

               default:
                   return state;
           }
       }
