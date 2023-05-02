import React, { useState, ReactElement, FunctionComponent } from 'react'
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import SportContext from 'app/contexts/SportContext'
import { Sport } from 'app/const'

interface ExtraOptions {
  mocks: MockedResponse[]
  sport: Sport
}
interface RouterOptions {
  route: string
  history: History
}
type RenderWithAppResult = RouterOptions & RenderResult
type RenderWithAppOptions = RouterOptions & ExtraOptions & RenderOptions
type RenderWithApp = (ui: ReactElement, options?: Partial<RenderWithAppOptions>) => RenderWithAppResult
const renderWithApp: RenderWithApp = (
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
  const resolvers = {
    Query: {
      isLoggedIn: () => {
        return true
      }
    }
  }
  const Wrapper: FunctionComponent = ({ children }) => {
    const sportHook = useState(sport)
    return (
      <SportContext.Provider value={sportHook}>
        <Router history={history}>
          <MockedProvider mocks={mocks} addTypename={true} resolvers={resolvers}>
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
