import fetch from "node-fetch";

const buildAuthUrl = (path) => "http://auth:3000" + path;
export default class AuthApi {
  verifyToken = (token) => {
    const verifyTokenUrl = buildAuthUrl("/auth/verify")
    return fetch(verifyTokenUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  attemptLogin = (args) => {
    const loginUrl = buildAuthUrl("/auth/login")
    return fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
  };
}
