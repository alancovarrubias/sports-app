import React from 'react'
import { renderWithRouter } from '@test-utils/Router'
import Main from '../Main'

jest.mock('../Seasons')
jest.mock('../Games')
jest.mock('../Game/index')
test('redirects from root to /seasons', () => {
  const { history } = renderWithRouter(<Main />, {
    route: '/',
  })
  expect(history.location.pathname).toEqual('/seasons')
})

test('/seasons shows seasons component', () => {
  const { getByTestId } = renderWithRouter(<Main />, {
    route: '/seasons',
  })
  const header = getByTestId('subheader')
  expect(header).toHaveTextContent(/seasons$/i)
})

test('/seasons/:season_id/games shows games component', () => {
  const { getByTestId } = renderWithRouter(<Main />, {
    route: '/seasons/:season_id/games',
  })
  const header = getByTestId('subheader')
  expect(header).toHaveTextContent(/games$/i)
})

test('/seasons/:season_id/games/:game_id shows game component', () => {
  const { getByTestId } = renderWithRouter(<Main />, {
    route: '/seasons/:season_id/games/:game_id',
  })
  const header = getByTestId('subheader')
  expect(header).toHaveTextContent(/game$/i)
})

test('landing on a bad page show no match component', () => {
  const { getByTestId } = renderWithRouter(<Main />, {
    route: '/something-that-does-not-match',
  })
  const header = getByTestId('subheader')
  expect(header).toHaveTextContent(/nomatch/i)
})
