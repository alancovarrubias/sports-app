import fetch from 'node-fetch'
import initServer from "@app/initServer";
import { LOGGED_IN_CONTEXT, LOGGED_OUT_CONTEXT } from "@test-utils/mocks";
import { GAMES_QUERY } from "@test-utils/queries";
import { executeRequest, mockFetch, successfulResponse } from "@test-utils/helpers";
import { Game } from "@app/__generated__/resolvers-types";
import { GAMES_URL } from '@app/dataSources/nbaApi';
jest.mock("node-fetch");

let server;
export const GAME: Game = {
    id: "1",
    away_team: "LAD",
    home_team: "LAA",
    date: "2020-06-25"
}

beforeAll(() => {
    server = initServer();
});

const GAME_RESPONSE = successfulResponse([GAME]);
describe("Games Query", () => {
    it("returns games and runs query when logged in", async () => {
        mockFetch(GAME_RESPONSE);
        const response = await executeRequest(server, {
            query: GAMES_QUERY,
            contextValue: LOGGED_IN_CONTEXT,
        });

        expect(fetch).toHaveBeenCalledWith(GAMES_URL);
        expect(response).toHaveNoErrors();
        expect(response).toReturnData({
            games: [GAME],
        });
    });
    it("throws error when not logged in", async () => {
        const response = await executeRequest(server, {
            query: GAMES_QUERY,
            contextValue: LOGGED_OUT_CONTEXT,
        });

        expect(response).toReturnError("User is not authenticated");
    });
});
