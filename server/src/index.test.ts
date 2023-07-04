import type { FormattedExecutionResult } from "graphql";
import request from "supertest";
import createApolloServer from "./createApolloServer";
import { USER } from "./const";

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
          user: USER,
        },
      }
    );

    expect(response.body.kind === "single");
    const body = response.body as SingleFormattedExecutionResult;
    expect(body.singleResult.errors).toBeUndefined();
    expect(body.singleResult.data).toEqual({
      currentUser: USER,
    });
  });
});

describe("e2e tests", () => {
  it("throws error without an authorization token", async () => {
    const response = await request(url).post("/").send({ query: GET_USER });

    expect(response.body.kind === "single");
    const error = response.body.errors[0];
    expect(error.extensions.code).toEqual("UNAUTHENTICATED");
    expect(error.message).toEqual("User is not authenticated");
  });
  it("returns provided user with any authorization code", async () => {
    const response = await request(url)
      .post("/")
      .set({ Authorization: "dummy_token" })
      .send({ query: GET_USER });

    expect(response.body.kind === "single");
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data).toEqual({
      currentUser: USER,
    });
  });
});
