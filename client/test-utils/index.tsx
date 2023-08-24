import React, { FunctionComponent } from 'react'
import { render } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { UserContextProvider } from 'app/contexts/UserContext'
import { AUTHORIZED_USER, UNAUTHORIZED_USER } from 'app/contexts/UserProvider'

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

export const renderWithContext = (
    ui: JSX.Element,
    mocks: MockedResponse[],
    isLoggedIn: boolean
) => {
    const user = isLoggedIn ? AUTHORIZED_USER : UNAUTHORIZED_USER
    const Wrapper: FunctionComponent = ({ children }) => {
        return (
            <MockedProvider mocks={mocks}>
                <UserContextProvider initialValue={user}>
                    {children as JSX.Element}
                </UserContextProvider>
            </MockedProvider>
        )
    }
    return render(ui, { wrapper: Wrapper })
}