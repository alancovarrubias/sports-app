import initServer from "@app/initServer";
import { GAME, LOGGED_IN_CONTEXT, LOGGED_OUT_CONTEXT } from "@test-utils/mocks";
import { GAMES_QUERY } from "@test-utils/queries";
import { executeRequest } from "@test-utils/helpers";
jest.mock("node-fetch");

let server;

beforeAll(() => {
    server = initServer();
});

describe("Games Query", () => {
    it("returns games", async () => {
        const response = await executeRequest(server, {
            query: GAMES_QUERY,
            contextValue: LOGGED_IN_CONTEXT,
        });

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
