import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AUTH_TOKEN } from 'app/const'
import AppRoutes from '../AppRoutes'

jest.mock('../components/Login')
jest.mock('../components/Home')

const renderAppRoutes = (path) => {
    render(
        <MemoryRouter initialEntries={[path]}>
            <AppRoutes />
        </MemoryRouter>
    )
}

test('/login renders login page', () => {
    renderAppRoutes('/login')
    const loginElement = screen.getByText(/mock login/i);
    expect(loginElement).toBeInTheDocument();
});

describe('unauthorized user', () => {
    test('/ redirects to login page', () => {
        renderAppRoutes('/')
        const loginElement = screen.getByText(/mock login/i);
        expect(loginElement).toBeInTheDocument();
    });
    test('/home redirects to login page', () => {
        renderAppRoutes('/home')
        const loginElement = screen.getByText(/mock login/i);
        expect(loginElement).toBeInTheDocument();
    });
})

describe('authorized user', () => {
    beforeEach(() => {
        localStorage.setItem(AUTH_TOKEN, 'TOKEN')
    })
    test('/ redirects to home page', () => {
        renderAppRoutes('/')
        const homeElement = screen.getByText(/mock home/i);
        expect(homeElement).toBeInTheDocument();
    });
    test('/home renders home page', () => {
        renderAppRoutes('/home')
        const homeElement = screen.getByText(/mock home/i);
        expect(homeElement).toBeInTheDocument();
    });
})