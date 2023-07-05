import createApolloServer from "../../src/createApolloServer";
import { USER, LOGGED_IN_CONTEXT, LOGGED_OUT_CONTEXT } from "../mocks";
import { CURRENT_USER_QUERY } from "../queries";
import { executeRequest } from "../utils";
jest.mock("node-fetch");

let server;

beforeAll(() => {
  server = createApolloServer();
});

describe("CurrentUser Query", () => {
  it("returns provided user", async () => {
    const response = await executeRequest(server, {
      query: CURRENT_USER_QUERY,
      contextValue: LOGGED_IN_CONTEXT,
    });

    expect(response).toHaveNoErrors();
    expect(response).toReturnData({
      currentUser: USER,
    });
  });
  it("throws error when not logged in", async () => {
    const response = await executeRequest(server, {
      query: CURRENT_USER_QUERY,
      contextValue: LOGGED_OUT_CONTEXT,
    });

    expect(response).toReturnError("User is not authenticated");
  });
});
