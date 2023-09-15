import React from 'react';
import Games, { GAMES_QUERY, GAME_HEADERS } from 'app/components/Games'
import { renderWithContext, waitFor, screen } from '@test-utils/index';

const mockPush = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush
  }),
}));

const GAMES = [
  {
    id: "1",
    date: "2023-09-07",
    away_team: {
      id: "1",
      name: "Detroit Lions"
    },
    home_team: {
      id: "2",
      name: "Kansas City Chiefs"
    }
  },
  {
    id: "2",
    date: "2023-09-10",
    away_team: {
      id: "3",
      name: "Carolina Panthers"
    },
    home_team: {
      id: "4",
      name: "Atlanta Falcons"
    }
  }
]
const result = {
  data: {
    games: GAMES
  }
}

const request = {
  query: GAMES_QUERY,
  variables: { seasonId: '1' }
}
const gamesMock = [{ request, result }]
const renderGames = () => {
  renderWithContext(<Games />, gamesMock, true)
}

describe('Home', () => {
  test('renders game headers', async () => {
    renderGames()
    await waitFor(() => {
      GAME_HEADERS.forEach(header => expect(screen.getByText(header)).toBeInTheDocument())
    })
  })
  test('renders game data', async () => {
    renderGames()
    await waitFor(() => {
      GAMES.forEach(game => {
        expect(screen.getByText(game.date)).toBeInTheDocument()
        expect(screen.getByText(game.away_team.name)).toBeInTheDocument()
        expect(screen.getByText(game.home_team.name)).toBeInTheDocument()
      })
    })
  });
})