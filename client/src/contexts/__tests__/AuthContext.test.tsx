import React, { useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from 'app/contexts/AuthContext';

const AuthContextTestComponent = (): JSX.Element => {
    const user = useContext(AuthContext)
    return (
        <div>{user}</div>
    )
}

describe('AuthProvider', () => {
    it('should passed in user', async () => {
        const user = 'fakeemail'
        render(
            <AuthProvider user={user}>
                <AuthContextTestComponent />
            </AuthProvider>,
        )
        await waitFor(() => {
            expect(screen.getByText(user)).toBeInTheDocument()
        })
    });
});
