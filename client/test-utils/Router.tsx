import React, { ReactElement, FunctionComponent } from 'react'
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, History } from 'history'

export interface IRenderWithRouterOptions extends RenderOptions {
  route: string
  history: History
}
export type IRenderWithRouterResult = IRenderWithRouterOptions & RenderResult
interface IRenderWithRouter {
  (
    ui: ReactElement,
    options?: Partial<IRenderWithRouterOptions>
  ): IRenderWithRouterResult
}
const renderWithRouter: IRenderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper: FunctionComponent = ({ children }) => {
    return <Router history={history}>{children}</Router>
  }
  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    route,
    history,
  }
}

export { renderWithRouter }
export * from '@testing-library/react'
