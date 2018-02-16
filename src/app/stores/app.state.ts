import {
  IUserlistState,
  userlistReducer
} from './reducers/userlist/userlist.reducer';
import { sessionReducer, ISessionState } from './reducers/session/session.reducer';
import { User } from '../models/User';

export interface IGlobalState {
  userlistState: IUserlistState;
  sessionState: ISessionState;
  // statState: Stats;
}

export const globalState = {
  userlistState: userlistReducer,
  sessionState: sessionReducer,
};
