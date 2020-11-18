import React, { useState, ReactElement, FunctionComponent } from 'react'
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import SportContext from '../src/contexts/SportContext'
import { Sport } from '@app/const'

export interface IRenderWithSportContextOptions extends RenderOptions {
  sport: Sport
}
interface IRenderWithSportContext {
  (
    ui: ReactElement,
    options?: Partial<IRenderWithSportContextOptions>
  ): RenderResult
}
const renderWithSportContext: IRenderWithSportContext = (
  ui,
  { sport = Sport.NBA } = {}
) => {
  const Wrapper: FunctionComponent = ({ children }) => {
    const sportHook = useState(sport)
    return (
      <SportContext.Provider value={sportHook}>
        {children}
      </SportContext.Provider>
    )
  }
  return render(ui, { wrapper: Wrapper })
}

export { renderWithSportContext }
export * from '@testing-library/react'
