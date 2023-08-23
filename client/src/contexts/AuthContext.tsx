import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client';

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
        email
    }
  }
`;

export const AuthProvider = ({ children }) => {
    const { data, error } = useQuery(CURRENT_USER)
    useEffect(() => {
        if (data) {
            dispatch({ type: 'LOGIN_SUCCESS', user: data.currentUser })
        }
        if (error) {
            dispatch({ type: 'LOGIN_FAILURE' })
        }
    }, [data, error])
    const [auth, dispatch] = useReducer(AuthReducer, null)
    if (!auth) {
        return null
    }
    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}


function AuthReducer(_user, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
            return { isLoggedIn: true, ...action.user }
        }
        case 'LOGIN_FAILURE': {
            return { isLoggedIn: false }
        }
        default: {
            throw Error('Unknown action' + action.type)
        }
    }

}