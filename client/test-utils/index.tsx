import React, { FunctionComponent } from 'react'
import { render } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'

export const renderWithPath = (
    ui: JSX.Element,
    path: string
) => {
    const Wrapper: FunctionComponent = ({ children }) => {
        return (
            <MemoryRouter initialEntries={[path]}>
                {children as JSX.Element}
            </MemoryRouter>
        )
    }
    return render(ui, { wrapper: Wrapper })
}

export const renderWithMocks = (
    ui: JSX.Element,
    mocks: MockedResponse[],
) => {
    const Wrapper: FunctionComponent = ({ children }) => {
        return (
            <MockedProvider mocks={mocks}>
                {children as JSX.Element}
            </MockedProvider>
        )
    }
    return render(ui, { wrapper: Wrapper })
}
export * from '@testing-library/react'
