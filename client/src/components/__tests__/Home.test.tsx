import React from 'react';
import Home from 'app/components/Home'
import { Paths } from 'app/const'
import { screen, fireEvent, waitFor, renderWithContext } from '@test-utils/index';
import { getToken, setToken } from 'app/utils/auth';

const mockPush = jest.fn()
jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        push: mockPush
    }),
}));

const renderHome = () => {
    renderWithContext(<Home />, [], true)
    const logoutButton = screen.getByRole('button', { name: /logout/i })
    return { logoutButton }
}

describe('Home', () => {
    beforeEach(() => {
        setToken('TOKEN')
    })

    afterEach(() => {
        mockPush.mockClear()
    })

    test('renders logout button', () => {
        const { logoutButton } = renderHome()
        expect(logoutButton).toBeInTheDocument();
    });

    test('removes token on click', async () => {
        const { logoutButton } = renderHome()
        fireEvent.click(logoutButton)
        await waitFor(() => expect(getToken()).toBeNull())
    });

    test('redirects to login page', async () => {
        const { logoutButton } = renderHome()
        fireEvent.click(logoutButton)
        await waitFor(() => expect(mockPush).toHaveBeenCalledWith(Paths.Login))
    });

})