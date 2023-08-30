import fetch from "node-fetch";

const buildAuthUrl = (path) => "http://auth:3000" + path;
export const VERIFY_URL = buildAuthUrl("/auth/verify");
export const LOGIN_URL = buildAuthUrl("/auth/login");

export default class AuthApi {
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
