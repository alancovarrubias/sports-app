import React, { useContext, useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext, AuthDispatchContext } from 'app/contexts/AuthContext';

const USER = 'fakeemail'
const DispatchActionComponent = ({ action }): JSX.Element => {
    const user = useContext(AuthContext)
    const dispatch = useContext(AuthDispatchContext)
    useEffect(() => {
        dispatch(action)
    }, [])
    return (
        <div>{user}</div>
    )
}

describe('AuthProvider', () => {
    it('should passed in user', async () => {
        const loginAction = { type: 'LOGIN', user: USER }
        render(
            <AuthProvider>
                <DispatchActionComponent action={loginAction} />
            </AuthProvider>,
        )
        await waitFor(() => {
            expect(screen.getByText(USER)).toBeInTheDocument()
        })
    });
});
