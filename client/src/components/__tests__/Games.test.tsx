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
      __typename: "Team",
      id: "1",
      name: "Detroit Lions"
    },
    home_team: {
      __typename: "Team",
      id: "2",
      name: "Kansas City Chiefs"
    },
    away_full_game_stat: {
      __typename: "Stat",
      id: "1",
      carries: 1
    },
    home_full_game_stat: {
      __typename: "Stat",
      id: "2",
      carries: 2
    }
  },
  {
    id: "2",
    date: "2023-09-10",
    away_team: {
      __typename: "Team",
      id: "3",
      name: "Carolina Panthers"
    },
    home_team: {
      __typename: "Team",
      id: "4",
      name: "Atlanta Falcons"
    },
    away_full_game_stat: {
      __typename: "Stat",
      id: "3",
      carries: 3
    },
    home_full_game_stat: {
      __typename: "Stat",
      id: "4",
      carries: 4
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
        expect(screen.getByText(game.away_full_game_stat.carries)).toBeInTheDocument()
        expect(screen.getByText(game.home_full_game_stat.carries)).toBeInTheDocument()
      })
    })
  });
})