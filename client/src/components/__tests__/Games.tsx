import React from 'react'
import { renderWithApp, waitFor } from '@test-utils/App'
import Games from '../Games'
import GamesMock from '@mocks/apollo/Games'
import { useParams } from 'react-router-dom'

const mockedUseParams = useParams as jest.Mock

const renderGames = () => {
  mockedUseParams.mockReturnValue({ season_id: 1 })
  return renderWithApp(<Games />, { mocks: GamesMock })
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
  })
})
