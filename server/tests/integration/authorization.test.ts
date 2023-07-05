import fetch from "node-fetch";
import runApolloServer from "../../src/runApolloServer";
import { USER, AUTH_HEADERS } from "../mocks";
import { mockFetch, executeE2ERequest, successfulResponse } from "../utils";
import { CURRENT_USER_QUERY } from "../queries";
import { VERIFY_URL } from "../../src/dataSources/authAPI";
jest.mock("node-fetch");

const CURRENT_USER_RESPONSE = successfulResponse(USER);
const UNAUTHENTICATED_RESPONSE = { status: 401 };

let server;
let url;

beforeAll(async () => {
  ({ server, url } = await runApolloServer({ port: 0 }));
});

afterAll(async () => {
  await server?.stop();
});

describe("CurrentUser Authorization", () => {
  it("returns provided user with a valid authorization code", async () => {
    mockFetch(CURRENT_USER_RESPONSE);
    const response = await executeE2ERequest({
      url,
      query: CURRENT_USER_QUERY,
    });

    expect(fetch).toHaveBeenCalledWith(VERIFY_URL, AUTH_HEADERS);
    expect(response).toHaveNoErrors();
    expect(response).toReturnData({
      currentUser: USER,
    });
  });
  it("throws error with an invalid authorization token", async () => {
    mockFetch(UNAUTHENTICATED_RESPONSE);
    const response = await executeE2ERequest({
      url,
      query: CURRENT_USER_QUERY,
    });

    expect(fetch).toHaveBeenCalledWith(VERIFY_URL, AUTH_HEADERS);
    expect(response).toReturnError("User is not authenticated");
  });
});
