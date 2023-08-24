import React, { useState, useEffect, } from 'react'
import { useQuery, gql } from '@apollo/client'
import { UserContextProvider } from './UserContext'
import { getToken } from 'app/utils/auth';

export const AUTHORIZED_USER = { isLoggedIn: true }
export const UNAUTHORIZED_USER = { isLoggedIn: false }
export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
        email
    }
  }
`;

const UnauthorizedUserProvider = ({ children }) => {
    return (
        <UserContextProvider initialValue={UNAUTHORIZED_USER}>
            {children}
        </UserContextProvider>
    )
}

const ValidateTokenProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const { data, error } = useQuery(CURRENT_USER)
    useEffect(() => {
        if (data) setUser({ ...AUTHORIZED_USER, ...data.currentUser })
        if (error) setUser(UNAUTHORIZED_USER)
    }, [data, error])
    if (!user) {
        return null
    }
    return (
        <UserContextProvider initialValue={user}>
            {children}
        </UserContextProvider>
    )
}


const UserProvider = ({ children }) => {
    const UserProvider = getToken() ? ValidateTokenProvider : UnauthorizedUserProvider
    return <UserProvider>{children}</UserProvider>
}

export default UserProvider
