import fetch from "node-fetch";
import initServer from "@app/initServer";
import { GAME, LOGGED_IN_CONTEXT, LOGGED_OUT_CONTEXT } from "@test-utils/mocks";
import { GAMES_QUERY } from "@test-utils/queries";
import {
  executeRequest,
  mockFetch,
  successfulResponse,
} from "@test-utils/helpers";
import { buildGamesUrl } from "@app/dataSources/footballApi";
jest.mock("node-fetch");

let server;

beforeAll(() => {
  server = initServer();
});

const variables = {
  seasonId: "1",
};

const GAMES_RESPONSE = successfulResponse({
  data: [{ id: "1", type: "game", attributes: GAME }],
});
describe("Games Query", () => {
  it("returns games and runs query when logged in", async () => {
    mockFetch(GAMES_RESPONSE);
    const response = await executeRequest(server, {
      query: GAMES_QUERY,
      variables,
      contextValue: LOGGED_IN_CONTEXT,
    });

    const gamesUrl = buildGamesUrl(variables.seasonId);
    expect(fetch).toHaveBeenCalledWith(gamesUrl);
    expect(response).toHaveNoErrors();
    expect(response).toReturnData({
      games: [GAME],
    });
  });
  it("throws error when not logged in", async () => {
    const response = await executeRequest(server, {
      query: GAMES_QUERY,
      variables,
      contextValue: LOGGED_OUT_CONTEXT,
    });

    expect(response).toReturnError("User is not authenticated");
  });
});
