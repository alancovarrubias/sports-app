import fetch from "node-fetch";

const buildAuthURL = (path) => "http://auth:3000" + path;
export const VERIFY_URL = buildAuthURL("/auth/verify");
export const LOGIN_URL = buildAuthURL("/auth/login");

export default class AuthAPI {
  verifyToken = (token) => {
    return fetch(VERIFY_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  attemptLogin = (args) => {
    return fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
  };
}
