import React, { createContext } from 'react'
import { useHistory } from 'react-router-dom'
import { userAfterRoute, userMiddleware, userReducer } from 'app/reducers/userReducer';
import useReducerWithMiddleware from 'app/reducers/useReducerWithMiddleware';

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

export const UserContextProvider = ({ children, initialValue }) => {
    const history = useHistory()
    const afterware = action => {
        const route = userAfterRoute(action)
        if (route) history.push(route)
    }
    const [user, dispatch] = useReducerWithMiddleware(userReducer, initialValue, userMiddleware, afterware)
    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}
