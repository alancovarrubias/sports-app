import React, { ReactElement, FunctionComponent } from 'react'
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'

export interface IRenderWithApolloOptions extends RenderOptions {
  mocks: MockedResponse[]
}
interface IRenderWithApollo {
  (ui: ReactElement, options?: Partial<IRenderWithApolloOptions>): RenderResult
}
const renderWithApollo: IRenderWithApollo = (
  ui,
  { mocks = [], ...renderOptions } = {}
) => {
  const Wrapper: FunctionComponent = ({ children }) => {
    return (
      <MockedProvider mocks={mocks} addTypename={true}>
        {children as ReactElement}
      </MockedProvider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export { renderWithApollo }
export * from '@testing-library/react'
