import React from 'react'
import { renderWithApp, waitFor } from '@test-utils/App'
import Games from '../Games'
import GamesMock from '@mocks/apollo/Games'

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom") as object,
  useLocation: () => ({
    search: "?season_id=1"
  })
}));

const renderGames = () => {
  return renderWithApp(<Games />, { mocks: GamesMock })
}
test('renders games header with the specified sport context', async () => {
  const { getByTestId } = renderGames()
  await waitFor(() =>
    expect(getByTestId('subheader')).toHaveTextContent(/games$/i)
  )
})

test('renders games data from mocked response', async () => {
  const { getByText } = renderGames()
  await waitFor(() => {
    expect(getByText('Clippers')).toBeDefined()
    expect(getByText('Lakers')).toBeDefined()
  })
})
