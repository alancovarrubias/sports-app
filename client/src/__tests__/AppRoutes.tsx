import { screen } from '@testing-library/react';
import { renderApp } from '@test-utils/Render'
import { AUTH_TOKEN, Paths } from 'app/const'

jest.mock('../components/Login')
jest.mock('../components/Home')

test('login path renders login page', () => {
    renderApp({ path: Paths.Login })
    const loginElement = screen.getByText(/mock login/i);
    expect(loginElement).toBeInTheDocument();
});

describe('unauthorized user', () => {
    beforeEach(() => {
        localStorage.removeItem(AUTH_TOKEN)
    })
    test('root path redirects to login page', () => {
        renderApp({ path: Paths.Root })
        const loginElement = screen.getByText(/mock login/i);
        expect(loginElement).toBeInTheDocument();
    });
    test('home path redirects to login page', () => {
        renderApp({ path: Paths.Home })
        const loginElement = screen.getByText(/mock login/i);
        expect(loginElement).toBeInTheDocument();
    });
})

describe('authorized user', () => {
    beforeEach(() => {
        localStorage.setItem(AUTH_TOKEN, 'TOKEN')
    })
    test('root path redirects to home page', () => {
        renderApp({ path: Paths.Root })
        const homeElement = screen.getByText(/mock home/i);
        expect(homeElement).toBeInTheDocument();
    });
    test('home path renders home page', () => {
        renderApp({ path: Paths.Home })
        const homeElement = screen.getByText(/mock home/i);
        expect(homeElement).toBeInTheDocument();
    });
})