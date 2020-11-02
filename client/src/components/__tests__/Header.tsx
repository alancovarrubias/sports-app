import React from 'react'
import { renderWithSportContext } from '@test-utils/SportContext'
import user from '@testing-library/user-event'
import Header from '../Header'
import { Sport } from '@app/const'

test('renders a header with the specified sport context', () => {
  const { getByTestId } = renderWithSportContext(<Header />, {
    sport: Sport.NBA,
  })
  const header = getByTestId('header')
  expect(header).toHaveTextContent(/nba/i)
})

test('toggles sport context when clicked', () => {
  const { getByTestId } = renderWithSportContext(<Header />)
  const header = getByTestId('header')
  user.click(header)
  expect(header).toHaveTextContent(/mlb/i)
  user.click(header)
  expect(header).toHaveTextContent(/nba/i)
})
