import React from 'react';
import Games, { GAMES_QUERY, GAME_HEADERS, todayDate } from 'app/components/Games'
import { renderWithContext, waitFor, screen } from '@test-utils/index';

const mockPush = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush
  }),
}));

const GAME =
{
  id: "1",
  date: "2023-09-07",
  start_time: "2023-09-15T00:15:00.000Z",
  game_clock: "Halftime",
  kicked: 'away',
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
    attempts: 1,
    completions: 2,
    score: 2413,
    carries: 3,
    passing_yards: 4,
    rushing_yards: 5,
    ave_per_play: 6,
    ave_per_att: 7,
    ave_per_car: 113,
    total_plays: 114,
    total_yards: 115
  },
  home_full_game_stat: {
    __typename: "Stat",
    id: "2",
    attempts: 106,
    score: 1233,
    completions: 107,
    carries: 108,
    passing_yards: 109,
    rushing_yards: 110,
    ave_per_play: 111,
    ave_per_att: 112,
    ave_per_car: 113,
    total_plays: 114,
    total_yards: 115
  }
}
const result = {
  data: {
    games: [GAME]
  }
}

const request = {
  query: GAMES_QUERY,
  variables: { date: todayDate() }
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
      expect(screen.getByText(GAME.date)).toBeInTheDocument()
      expect(screen.getByText("September 14, 2023 at 5:15 PM")).toBeInTheDocument()
      expect(screen.getByText(GAME.away_team.name)).toBeInTheDocument()
      expect(screen.getByText(GAME.away_full_game_stat.attempts)).toBeInTheDocument()
      expect(screen.getByText(GAME.away_full_game_stat.completions)).toBeInTheDocument()
      expect(screen.getByText(GAME.away_full_game_stat.carries)).toBeInTheDocument()
      expect(screen.getByText(GAME.away_full_game_stat.passing_yards)).toBeInTheDocument()
      expect(screen.getByText(GAME.away_full_game_stat.rushing_yards)).toBeInTheDocument()
      expect(screen.getByText(GAME.home_team.name)).toBeInTheDocument()
      expect(screen.getByText(GAME.home_full_game_stat.attempts)).toBeInTheDocument()
      expect(screen.getByText(GAME.home_full_game_stat.completions)).toBeInTheDocument()
      expect(screen.getByText(GAME.home_full_game_stat.carries)).toBeInTheDocument()
      expect(screen.getByText(GAME.home_full_game_stat.passing_yards)).toBeInTheDocument()
      expect(screen.getByText(GAME.home_full_game_stat.rushing_yards)).toBeInTheDocument()
    })
  });
})