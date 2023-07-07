import request from "supertest";
import fetch, { Response } from "node-fetch";
import { TOKEN } from "@test-utils/mocks";

export const mockFetch = (response: Partial<Response>) => {
  (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
    Promise.resolve(response as Response)
  );
};

export const executeE2ERequest = ({ url, query }) => {
  return request(url).post("/").set({ Authorization: TOKEN }).send({ query });
};
export const successfulResponse = (data) => {
  return {
    status: 200,
    json: () => Promise.resolve(data),
  };
};

export const executeRequest = (
  server,
  { query, variables = {}, contextValue = {} }
) => {
  return server.executeOperation(
    {
      query,
      variables,
    },
    {
      contextValue,
    }
  );
};
