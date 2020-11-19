import React from 'react'
import { renderWithApp, waitFor } from '@test-utils/App'
import Game from '../Game'
import GameMock from '@mocks/apollo/Game'
import { useParams } from 'react-router-dom'

const mockedUseParams = useParams as jest.Mock

const renderGame = () => {
  mockedUseParams.mockReturnValue({ season_id: 1, game_id: 1 })
  return renderWithApp(<Game />, { mocks: GameMock })
}
test('renders a header with the specified sport context', async () => {
  const { getByTestId } = renderGame()
  await waitFor(() =>
    expect(getByTestId('subheader')).toHaveTextContent(/game/i)
  )
})

test('renders games data from mocked response', async () => {
  const { getByText } = renderGame()
  await waitFor(() => {
    expect(getByText('Kawhi Leonard')).toBeDefined()
    expect(getByText('Anthony Davis')).toBeDefined()
  })
})
