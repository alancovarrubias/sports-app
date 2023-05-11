import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { } from '@apollo/client/testing';
import AppRoutes from 'app/AppRoutes';
import Layout from 'app/Layout';

interface RenderAppProps {
    mocks?: MockedResponse[]
    path?: string
}
export const renderComponent = (ui: JSX.Element, { mocks = [], path = '/' }: RenderAppProps) => {
    const Wrapper = ({ children }) => {
        return (
            <MemoryRouter initialEntries={[path]}>
                <MockedProvider mocks={mocks} addTypename={false}>
                    {children as JSX.Element}
                </MockedProvider>
            </MemoryRouter>
        )
    }
    return render(ui, { wrapper: Wrapper })
}

export const renderLayout = ({ mocks = [], path = '/' }: RenderAppProps) => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <Layout />
            </MockedProvider>
        </MemoryRouter>
    )
}

export const renderApp = ({ mocks = [], path = '/' }: RenderAppProps) => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <MockedProvider mocks={mocks} addTypename={false}>
                <AppRoutes />
            </MockedProvider>
        </MemoryRouter>
    )
}
export const createMock = (request, result) => {
    return [
        {
            request,
            result,
        },
    ]

}