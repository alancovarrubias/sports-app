import type { FormattedExecutionResult } from "graphql";
import fetch, { Response } from "node-fetch";
import request from "supertest";
import createApolloServer from "./createApolloServer";
import { MOCK_USER } from "./mocks";
import { AUTH_SERVER, VERIFY_PATH } from "./const";
jest.mock("node-fetch");

type SingleFormattedExecutionResult = {
  kind: "single";
  singleResult: FormattedExecutionResult<Record<string, unknown>>;
};

const GET_USER = `#graphql
  query GetUser {
    currentUser {
      id
      email
    }
  }
`;

const mockFetchResponse = (response: Response) => {
  (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
    Promise.resolve(response)
  );
};

let server;
let url;

beforeAll(async () => {
  ({ server, url } = await createApolloServer({ port: 0 }));
});

afterAll(async () => {
  await server?.stop();
});

describe("integration tests", () => {
  it("returns provided user", async () => {
    const response = await server.executeOperation(
      {
        query: GET_USER,
      },
      {
        contextValue: {
          user: MOCK_USER,
        },
      }
    );

    expect(response.body.kind === "single");
    const body = response.body as SingleFormattedExecutionResult;
    expect(body.singleResult.errors).toBeUndefined();
    expect(body.singleResult.data).toEqual({
      currentUser: MOCK_USER,
    });
  });
});

describe("e2e tests", () => {
  it("throws error with an invalid authorization token", async () => {
    mockFetchResponse({ status: 401 } as Response);
    const response = await request(url).post("/").send({ query: GET_USER });

    expect(fetch).toHaveBeenCalled();
    const error = response.body.errors[0];
    expect(error.extensions.code).toEqual("UNAUTHENTICATED");
    expect(error.message).toEqual("User is not authenticated");
  });
  it("returns provided user with a valid authorization code", async () => {
    mockFetchResponse({
      status: 200,
      json: () => Promise.resolve(MOCK_USER),
    } as Response);
    const response = await request(url)
      .post("/")
      .set({ Authorization: "valid_token" })
      .send({ query: GET_USER });

    expect(fetch).toHaveBeenCalledWith(AUTH_SERVER + VERIFY_PATH, {
      headers: { Authorization: "Bearer valid_token" },
    });
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data).toEqual({
      currentUser: MOCK_USER,
    });
  });
});
