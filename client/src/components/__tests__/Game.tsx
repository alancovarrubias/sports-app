import React from 'react'
import { renderWithApollo, waitFor } from '@test-utils/Apollo'
import Game from '../Game'
import GameMock from '@mocks/apollo/Game'

const renderGame = () => {
  return renderWithApollo(<Game />, { mocks: GameMock })
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
