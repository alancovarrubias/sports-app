import React, { useReducer } from 'react'
import { createContext } from 'react';
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

export function AuthProvider({ children }) {
    const [auth, dispatch] = useReducer(AuthReducer, null)
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
        case 'LOGIN': {
            return action.user
        }
        default: {
            throw Error('Unknown action' + action.type)
        }
    }

}