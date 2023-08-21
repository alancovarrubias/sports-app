import React, { useEffect, useReducer } from 'react'
import { createContext } from 'react';
import { gql, useQuery } from '@apollo/client';

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
        email
    }
  }
`;

export function AuthProvider({ user, children }) {
    const [auth, dispatch] = useReducer(AuthReducer, user)
    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}


function AuthReducer(user, action) {
    switch (action.type) {
        case 'LOGIN': {
            return user
        }
        default: {
            throw Error('Unknown action' + action.type)
        }
    }

}