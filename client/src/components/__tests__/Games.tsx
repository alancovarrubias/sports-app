import React from 'react'
import { renderWithApollo, waitFor } from '@test-utils/Apollo'
import Games from '../Games'
import GamesMock from '@mocks/apollo/Games'

const renderGames = () => {
  return renderWithApollo(<Games />, { mocks: GamesMock })
}
test('renders a header with the specified sport context', async () => {
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
    expect(getByText('84')).toBeDefined()
    expect(getByText('94')).toBeDefined()
  })
})
