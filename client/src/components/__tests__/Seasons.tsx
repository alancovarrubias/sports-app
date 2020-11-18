import React from 'react'
import { renderWithApp, waitFor } from '@test-utils/App'
import SeasonsMock from '@mocks/apollo/Seasons'
import Seasons from '../Seasons'

const renderSeasons = () => {
  return renderWithApp(<Seasons />, { mocks: SeasonsMock })
}
test('renders loading state initially', async () => {
  const { getByTestId } = renderSeasons()
  await waitFor(() =>
    expect(getByTestId('subheader')).toHaveTextContent(/seasons$/i)
  )
})
test('renders a header with the specified sport context', async () => {
  const { getByTestId } = renderSeasons()
  await waitFor(() => expect(getByTestId('subheader')).toBeDefined())
})

test('renders seasons data from mocked response', async () => {
  const { getByText } = renderSeasons()
  await waitFor(() => expect(getByText('2020')).toBeDefined())
})
