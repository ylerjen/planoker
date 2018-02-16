import { Action } from '@ngrx/store';

import { User } from '../../../models/User';


export const INIT_STORE = 'INIT_STORE';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const REMOVE_USER = 'DECREMENT';
export interface IUserlistState {
  userList: Array<User>;
  isLoading: boolean;
}

export const initialState: IUserlistState = { userList: [], isLoading: false };

export function userlistReducer(state: IUserlistState = initialState, action: Action) {
    switch (action.type) {
        case ADD_USER:
            return [...state.userList, action.payload];

        case REMOVE_USER:
            const userToDelete = action.payload as User;
            return state.userList.filter(userEl => userEl.username !== userToDelete.username);

        default:
            return state;
    }
}

