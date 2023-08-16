import React from 'react'
import Routes from 'app/routes/Routes'
import { AUTH_TOKEN, Paths } from 'app/const'
import { clearToken, setToken } from 'app/utils/auth'
import { renderWithPath, screen } from '@test-utils/index'

jest.mock('app/components/Login')
jest.mock('app/components/Home')

export const renderRoutes = (path) => {
    return renderWithPath(<Routes />, path)
}

describe('Routes', () => {
    describe('unauthorized user', () => {
        beforeEach(() => {
            clearToken()
        })
        test('root path redirects to login page', () => {
            renderRoutes(Paths.Root)
            const loginElement = screen.getByText(/mock login/i);
            expect(loginElement).toBeInTheDocument();
        });
        test('home path redirects to login page', () => {
            renderRoutes(Paths.Home)
            const loginElement = screen.getByText(/mock login/i);
            expect(loginElement).toBeInTheDocument();
        });
    })

    describe('authorized user', () => {
        beforeEach(() => {
            setToken('TOKEN')
        })
        test('root path redirects to home page', () => {
            renderRoutes(Paths.Root)
            const homeElement = screen.getByText(/mock home/i);
            expect(homeElement).toBeInTheDocument();
        });
        test('home path renders home page', () => {
            renderRoutes(Paths.Home)
            const homeElement = screen.getByText(/mock home/i);
            expect(homeElement).toBeInTheDocument();
        });
    })
})