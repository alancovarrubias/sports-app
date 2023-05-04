import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AUTH_TOKEN } from 'app/const'
import AppRoutes from '../AppRoutes'

jest.mock('../components/Login')
jest.mock('../components/Home')

test('renders Login page when visiting /login', () => {
    render(
        <MemoryRouter initialEntries={['/login']}>
            <AppRoutes />
        </MemoryRouter>
    );
    const loginElement = screen.getByText(/mock login/i);
    expect(loginElement).toBeInTheDocument();
});

describe('User not logged in', () => {
    test('redirects to the login page when visiting /home', () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <AppRoutes />
            </MemoryRouter>
        );
        const loginElement = screen.getByText(/mock login/i);
        expect(loginElement).toBeInTheDocument();
    });
})

describe('User logged in', () => {
    beforeEach(() => {
        localStorage.setItem(AUTH_TOKEN, 'TOKEN')
    })
    test('redirects to the home page when visiting /home', () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <AppRoutes />
            </MemoryRouter>
        );
        const homeElement = screen.getByText(/mock home/i);
        expect(homeElement).toBeInTheDocument();
    });
})