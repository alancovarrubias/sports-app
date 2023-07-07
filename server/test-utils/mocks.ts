import AuthAPI from "@app/dataSources/authAPI";

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
  dataSources: {
    authAPI: new AuthAPI(),
  },
};
export const LOGGED_OUT_CONTEXT = {
  user: null,
  dataSources: {
    authAPI: new AuthAPI(),
  },
};
