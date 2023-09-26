import { LOGIN, LOGOUT } from 'app/actions/userActions';
import { Paths } from 'app/const';
import { clearToken, setToken } from 'app/utils/auth';

export function userReducer(_user, action) {
    switch (action.type) {
        case LOGIN:
            return { isLoggedIn: true, ...action.payload.user }
        case LOGOUT: {
            return { isLoggedIn: false }
        }
        default: {
            throw Error('Unknown action' + action.type)
        }
    }
}

export function userAfterRoute({ type }) {
    switch (type) {
        case LOGIN:
            return Paths.Games
        case LOGOUT:
            return Paths.Login
    }
}

export function userMiddleware({ type, payload }) {
    switch (type) {
        case LOGIN:
            setToken(payload.token)
            break;
        case LOGOUT:
            clearToken()
            break;
    }
}