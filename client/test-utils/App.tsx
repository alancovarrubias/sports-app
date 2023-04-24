import React, { useState, ReactElement, FunctionComponent } from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import SportContext from 'app/contexts/SportContext'
import { Sport } from 'app/const'
import { IRenderWithApolloOptions } from './Apollo'
import { IRenderWithRouterOptions, IRenderWithRouterResult } from './Router'
import { IRenderWithSportContextOptions } from './SportContext'

type IRenderWithAppResult = IRenderWithRouterResult
type IRenderWithAppOptions = IRenderWithApolloOptions &
  IRenderWithRouterOptions &
  IRenderWithSportContextOptions
interface IRenderWithApp {
  (
    ui: ReactElement,
    options?: Partial<IRenderWithAppOptions>
  ): IRenderWithAppResult
}
const renderWithApp: IRenderWithApp = (
  ui,
  {
    sport = Sport.NBA,
    mocks = [],
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper: FunctionComponent = ({ children }) => {
    const sportHook = useState(sport)
    return (
      <SportContext.Provider value={sportHook}>
        <Router history={history}>
          <MockedProvider mocks={mocks} addTypename={true}>
            {children as ReactElement}
          </MockedProvider>
        </Router>
      </SportContext.Provider>
    )
  }
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    route,
    history,
  }
}

export { renderWithApp }
export * from '@testing-library/react'
