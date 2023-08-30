import fetch from "node-fetch";
import runServer from "@app/runServer";
import { VERIFY_URL } from "@app/dataSources/authApi";
import { USER, AUTH_HEADERS } from "@test-utils/mocks";
import {
  mockFetch,
  executeE2ERequest,
  successfulResponse,
} from "@test-utils/helpers";
import { CURRENT_USER_QUERY } from "@test-utils/queries";
jest.mock("node-fetch");

const CURRENT_USER_RESPONSE = successfulResponse(USER);
const UNAUTHENTICATED_RESPONSE = {
  status: 401,
  json: () => Promise.resolve({}),
};

let server;
let url;

beforeAll(async () => {
  ({ server, url } = await runServer({ port: 0 }));
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
