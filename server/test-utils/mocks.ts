import { Game } from "@app/__generated__/resolvers-types";
import AuthAPI from "@app/dataSources/authAPI";
import NbaApi from "@app/dataSources/nbaApi";
import { dataSources } from "@app/runServer";

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

export const GAME: Game = {
  id: "1",
  date: "2020-06-25",
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
};
