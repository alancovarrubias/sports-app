import React from 'react'
import Routes from 'app/routes/Routes'
import { AUTH_TOKEN } from 'app/const'
import { renderWithPath, screen } from '@test-utils/index'

jest.mock('app/components/Login')

export const renderRoutes = (path) => {
    return renderWithPath(<Routes />, path)
}

describe('Routes', () => {
    describe('unauthorized user', () => {
        beforeEach(() => {
            localStorage.removeItem(AUTH_TOKEN)
        })
        test('root path redirects to login page', () => {
            renderRoutes('/')
            const loginElement = screen.getByText(/login/i);
            expect(loginElement).toBeInTheDocument();
        });
        test('home path redirects to login page', () => {
            renderRoutes('/home')
            const loginElement = screen.getByText(/login/i);
            expect(loginElement).toBeInTheDocument();
        });
    })

    describe('authorized user', () => {
        beforeEach(() => {
            localStorage.setItem(AUTH_TOKEN, 'TOKEN')
        })
        test('root path redirects to home page', () => {
            renderRoutes('/')
            const homeElement = screen.getByText(/home/i);
            expect(homeElement).toBeInTheDocument();
        });
        test('home path renders home page', () => {
            renderRoutes('/home')
            const homeElement = screen.getByText(/home/i);
            expect(homeElement).toBeInTheDocument();
        });
    })
})