import { Action } from '@ngrx/store';
import { User } from '../models/User';
import { VoteCommand } from '../models/FirebaseCommand';

export const INIT_USER_STORE_START = 'INIT_USER_STORE_START';
export const INIT_USER_STORE_SUCCESS = 'INIT_USER_STORE_SUCCESS';
export const INIT_USER_STORE_FAILED = 'INIT_USER_STORE_FAILED';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const REMOVE_USER = 'REMOVE_USER';

/**
 * Init the User Store for a specific session
 * @param sessionId - the sessionId to retrieve the userlist from
 */
export function initUserStore(sessionId: string) {
    return {
        type: INIT_USER_STORE_START,
        payload: sessionId
    };
}

export function updateUser(payload: VoteCommand): UpdateUserAction {
    return {
        type: UPDATE_USER_START,
        payload
    };
}
export interface InitUserAction extends Action {
    payload: any;
}

export interface UpdateUserAction extends Action {
    payload: VoteCommand;
}
