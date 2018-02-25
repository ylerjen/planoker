import { Action } from '@ngrx/store';

import {
  IUserlistState,
  userlistReducer
} from './reducers/userlist/userlist.reducer';
import { ISessionState, sessionReducer } from './reducers/session/session.reducer';
import { User } from '../models/User';

export interface IGlobalState {
  userlistState: IUserlistState;
  sessionState: ISessionState;
}

export const globalState = {
  userlistState: userlistReducer,
  sessionState: sessionReducer,
};

export interface UnsafeAction extends Action {
  payload?: any;
}
