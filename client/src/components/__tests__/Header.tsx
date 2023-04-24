import React from 'react'
import { renderWithApp } from '@test-utils/App'
import user from '@testing-library/user-event'
import Header from '../Header'
import { Sport } from 'app/const'

test('renders a header with the specified sport context', () => {
  const { getByTestId } = renderWithApp(<Header />, {
    sport: Sport.NBA,
  })
  const header = getByTestId('header')
  expect(header).toHaveTextContent(/nba/i)
})

test('toggles sport context when clicked', () => {
  const { getByTestId } = renderWithApp(<Header />)
  const header = getByTestId('header')
  user.click(header)
  expect(header).toHaveTextContent(/mlb/i)
  user.click(header)
  expect(header).toHaveTextContent(/nba/i)
})
