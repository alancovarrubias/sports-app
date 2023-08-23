import React, { FunctionComponent } from 'react'
import { render } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'

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
