import fetch from "node-fetch";
import initServer from "@app/initServer";
import { LOGIN_URL } from "@app/dataSources/authAp";
import {
  LOGGED_IN_CONTEXT,
  LOGGED_OUT_CONTEXT,
  USER,
  TOKEN,
} from "@test-utils/mocks";
import {
  mockFetch,
  successfulResponse,
  executeRequest,
} from "@test-utils/helpers";
import { LOGIN_MUTATION } from "@test-utils/queries";
jest.mock("node-fetch");

const LOGIN_DATA = {
  token: TOKEN,
  user: USER,
};
const LOGIN_VARIABLES = {
  email: USER.email,
  password: "password",
};

const LOGIN_REQUEST_OPTIONS = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(LOGIN_VARIABLES),
};

const LOGIN_RESPONSE = successfulResponse(LOGIN_DATA);

let server;

beforeAll(() => {
  server = initServer();
});

describe("Login Mutation", () => {
  it("runs query when logged in", async () => {
    mockFetch(LOGIN_RESPONSE);
    const response = await executeRequest(server, {
      query: LOGIN_MUTATION,
      contextValue: LOGGED_IN_CONTEXT,
      variables: LOGIN_VARIABLES,
    });

    expect(fetch).toHaveBeenCalledWith(LOGIN_URL, LOGIN_REQUEST_OPTIONS);
    expect(response).toHaveNoErrors();
    expect(response).toReturnData({
      login: LOGIN_DATA,
    });
  });
  it("runs query when not logged in", async () => {
    mockFetch(LOGIN_RESPONSE);
    const response = await executeRequest(server, {
      query: LOGIN_MUTATION,
      contextValue: LOGGED_OUT_CONTEXT,
      variables: LOGIN_VARIABLES,
    });

    expect(fetch).toHaveBeenCalledWith(LOGIN_URL, LOGIN_REQUEST_OPTIONS);
    expect(response).toHaveNoErrors();
    expect(response).toReturnData({
      login: LOGIN_DATA,
    });
  });
});
