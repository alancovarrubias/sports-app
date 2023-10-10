import React from 'react';
import Games, { GAMES_QUERY, todayDate, getOrder } from 'app/components/Games'
import { renderWithContext, waitFor, screen } from '@test-utils/index';

const uniqueNumbers = new Set();

function generateUniqueNumber() {
  let num;
  do {
    num = Math.floor(Math.random() * 1000); // Adjust the range as needed
  } while (uniqueNumbers.has(num));

  uniqueNumbers.add(num);
  return num;
}

function randomSort(a, b) {
  return Math.random() - 0.5;
}

const mockPush = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush
  }),
}));

let statId = 1
const createStat = () => ({
  __typename: "Stat",
  id: String(statId++),
  attempts: generateUniqueNumber(),
  score: generateUniqueNumber(),
  completions: generateUniqueNumber(),
  carries: generateUniqueNumber(),
  passing_yards: generateUniqueNumber(),
  rushing_yards: generateUniqueNumber(),
  ave_per_play: generateUniqueNumber(),
  ave_per_att: generateUniqueNumber(),
  ave_per_car: generateUniqueNumber(),
  total_plays: generateUniqueNumber(),
  total_yards: generateUniqueNumber(),
  longest_rush: generateUniqueNumber(),
  longest_pass: generateUniqueNumber(),
  typa: generateUniqueNumber(),
  typai: generateUniqueNumber(),
  typc: generateUniqueNumber(),
  typp: generateUniqueNumber(),
})

let gameId = 1
const createGame = (overrides = {}) => ({
  id: String(gameId++),
  date: "2023-09-07",
  start_time: "2023-09-15T00:15:00.000Z",
  game_clock: "Final",
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
  away_full_game_stat: createStat(),
  home_full_game_stat: createStat(),
  away_first_half_stat: createStat(),
  home_first_half_stat: createStat(),
  ...overrides
})

const createMock = (games) => {
  const result = {
    data: {
      games
    }
  }

  const request = {
    query: GAMES_QUERY,
    variables: { date: todayDate() }
  }
  const gamesMock = [{ request, result }]

  return gamesMock
}
const renderGames = (games) => {
  renderWithContext(<Games />, createMock(games), true)
}

describe('GameTable content', () => {
  const GAME = createGame({ game_clock: 'Halftime' })
  beforeEach(() => {
    renderGames([GAME])
  })
  test('renders game data', async () => {
    await waitFor(() => {
      expect(screen.getByText("5:15 PM")).toBeInTheDocument()
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

describe('getOrder', () => {
  const NOT_STARTED = 'Not Started'
  const FIRST_QUARTER = '15:00 - 1st'
  const SECOND_QUARTER = '15:00 - 2nd'
  const HALFTIME = 'Halftime'
  const THIRD_QUARTER = '15:00 - 3rd'
  const FOURTH_QUARTER = '15:00 - 4th'
  const FINAL = 'Final'
  test('Halftime', async () => {
    expect(getOrder(HALFTIME)).toEqual(-1)
    expect(getOrder(FIRST_QUARTER)).toEqual(0)
    expect(getOrder(SECOND_QUARTER)).toEqual(1)
    expect(getOrder(NOT_STARTED)).toEqual(2)
    expect(getOrder(FINAL)).toEqual(3)
  })
})

expect.extend({
  toMatchBefore(received, expected) {
    const receivedPosition = received.getBoundingClientRect().top;
    const expectedPosition = expected.getBoundingClientRect().top;
    const pass = receivedPosition < expectedPosition;

    if (pass) {
      return {
        message: () =>
          `Expected element to appear before ${this.utils.printExpected(
            expected
          )}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Expected element to appear before ${this.utils.printExpected(
            expected
          )}`,
        pass: false,
      };
    }
  },
});