import fetch from "node-fetch";
import initServer from "@app/initServer";
import {
  LOGGED_IN_CONTEXT,
  LOGGED_OUT_CONTEXT,
  SEASON,
} from "@test-utils/mocks";
import { SEASONS_QUERY } from "@test-utils/queries";
import {
  executeRequest,
  mockFetch,
  successfulResponse,
} from "@test-utils/helpers";
import { buildSeasonsUrl } from "@app/dataSources/footballApi";
jest.mock("node-fetch");

let server;

beforeAll(() => {
  server = initServer();
});

const SEASONS_RESPONSE = successfulResponse({
  data: [{ id: "1", type: "season", attributes: SEASON }],
});
describe("Seasons Query", () => {
  it("returns games and runs query when logged in", async () => {
    mockFetch(SEASONS_RESPONSE);
    const response = await executeRequest(server, {
      query: SEASONS_QUERY,
      contextValue: LOGGED_IN_CONTEXT,
    });

    expect(fetch).toHaveBeenCalledWith(buildSeasonsUrl());
    expect(response).toHaveNoErrors();
    expect(response).toReturnData({
      seasons: [SEASON],
    });
  });
  it("throws error when not logged in", async () => {
    const response = await executeRequest(server, {
      query: SEASONS_QUERY,
      contextValue: LOGGED_OUT_CONTEXT,
    });

    expect(response).toReturnError("User is not authenticated");
  });
});
