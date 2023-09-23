import { Game, Season } from "@app/__generated__/resolvers-types";
import dataSources from "@app/dataSources";

export const USER = {
  id: "1",
  email: "aecovarru@gmail.com",
};
export const TOKEN = "token";
export const PASSWORD = "password";
export const AUTH_HEADERS = {
  headers: { Authorization: `Bearer ${TOKEN}` },
};
export const LOGIN_DATA = {
  token: TOKEN,
  user: USER,
};
export const LOGIN_VARIABLES = {
  email: USER.email,
  password: PASSWORD,
};
export const LOGIN_REQUEST_OPTIONS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(LOGIN_VARIABLES),
};
export const LOGGED_IN_CONTEXT = {
  user: USER,
  dataSources,
};
export const LOGGED_OUT_CONTEXT = {
  user: null,
  dataSources,
};

export const SEASON: Season = {
  id: "1",
  year: 2020,
};

export const GAME: Game = {
  id: "1",
  date: "2020-06-25",
  start_time: "2023-09-15T00:15:00.000Z",
  game_clock: "Not Started",
  kicked: "away",
  away_team: {
    id: "1",
    abbr: "LAD",
    city: "Los Angeles",
    name: "Dodgers",
  },
  home_team: {
    id: "2",
    abbr: "LAA",
    city: "Los Angeles",
    name: "Angels",
  },
  away_full_game_stat: {
    id: "1",
    attempts: 1,
    completions: 2,
    carries: 3,
    rushing_yards: 4,
    passing_yards: 5,
    score: 6,
    total_plays: 7,
    total_yards: 8,
    ave_per_car: 9.0,
    ave_per_att: 10.0,
    ave_per_play: 11.0,
  },
  home_full_game_stat: {
    id: "2",
    attempts: 1,
    completions: 2,
    carries: 3,
    rushing_yards: 4,
    passing_yards: 5,
    score: 6,
    total_plays: 7,
    total_yards: 8,
    ave_per_car: 9.0,
    ave_per_att: 10.0,
    ave_per_play: 11.0,
  },
};
