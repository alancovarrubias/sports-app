import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { } from '@apollo/client/testing';
import AppRoutes from 'app/AppRoutes';

interface RenderAppProps {
    mocks?: MockedResponse[]
    path?: string
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