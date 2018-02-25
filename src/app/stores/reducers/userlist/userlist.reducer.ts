import { UnsafeAction } from './../../app.state';
import { User } from '../../../models/User';
import {
    INIT_USER_STORE_START,
    INIT_USER_STORE_FAILED,
    INIT_USER_STORE_SUCCESS,
    UPDATE_USER_START,
    UPDATE_USER_FAILED,
    UPDATE_USER_SUCCESS,
    ADD_USER,
    REMOVE_USER,
} from '../../../actions/user.action';

export interface IUserlistState {
  userList: Array<User>;
  isLoading: boolean;
}

export const initialState: IUserlistState = { userList: [], isLoading: false };

export function userlistReducer(state: IUserlistState = initialState, action: UnsafeAction) {
    switch (action.type) {
        case INIT_USER_STORE_START:
        case UPDATE_USER_START:
            return Object.assign(
                { isLoading: true },
                state
            );

        case INIT_USER_STORE_FAILED:
        case UPDATE_USER_FAILED:
            return Object.assign(
                { isLoading: false },
                state
            );

        case INIT_USER_STORE_SUCCESS:
            return Object.assign(
                {},
                { isLoading: false, userList: action.payload }
            );

        case ADD_USER:
            return Object.assign(
                {},
                state,
                { isLoading: false, userList: [...state.userList, action.payload]}
            );

        case UPDATE_USER_SUCCESS:
            const user = action.payload as User;
            const userListUpdated = state.userList.map( u => (u.username !== user.username) ? u : user);
            return Object.assign(
                {},
                state,
                { userList: userListUpdated }
            );

        case REMOVE_USER:
            const userToDelete = action.payload as User;
            const userList = state.userList.filter( u => u.username !== user.username);
            return Object.assign(
                {},
                state,
                { userList }
            );

        default:
            return state;
    }
}
