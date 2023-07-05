import type { FormattedExecutionResult } from "graphql";
import fetch, { Response } from "node-fetch";
import request from "supertest";
import createApolloServer from "./createApolloServer";
import { MOCK_USER } from "./mocks";
import { AUTH_SERVER, LOGIN_PATH, VERIFY_PATH } from "./const";
jest.mock("node-fetch");

const LOGIN = `#graphql
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

const mockFetchResponse = (response: Response) => {
  (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
    Promise.resolve(response)
  );
};
type SingleFormattedExecutionResult = {
  kind: "single";
  singleResult: FormattedExecutionResult<Record<string, unknown>>;
};

let server;
let url;

beforeAll(async () => {
  ({ server, url } = await createApolloServer({ port: 0 }));
});

afterAll(async () => {
  await server?.stop();
});

describe("e2e tests", () => {
  it("returns provided user with a valid authorization code", async () => {
    mockFetchResponse({
      status: 200,
      json: () => Promise.resolve({ token: "token", user: MOCK_USER }),
    } as Response);
    const response = await server.executeOperation(
      {
        query: LOGIN,
        variables: { email: "aecovarru@gmail.com", password: "password" },
      },
      {
        contextValue: {
          user: null,
        },
      }
    );

    expect(fetch).toHaveBeenCalledWith(AUTH_SERVER + LOGIN_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "aecovarru@gmail.com",
        password: "password",
      }),
    });
    expect(response.body.kind === "single");
    const body = response.body as SingleFormattedExecutionResult;
    expect(body.singleResult.errors).toBeUndefined();
    expect(body.singleResult.data).toEqual({
      login: { user: MOCK_USER, token: "token" },
    });
  });
});
