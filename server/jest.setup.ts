import _ from "lodash";
export {};
declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveNoErrors(): R;
      toReturnData(data: T): R;
      toReturnError(message: T): R;
    }
  }
}
const getBody = (response) => {
  const body = response.body;
  return body.singleResult ? body.singleResult : body;
};
expect.extend({
  toHaveNoErrors(response) {
    const body = getBody(response);
    if (body.errors) {
      return {
        pass: false,
        message: () => `Expected errors to be empty`,
      };
    }
    return { pass: true, message: () => "Success" };
  },
  toReturnData(response, expectedData) {
    const body = getBody(response);
    if (!_.isEqual(body.data, expectedData)) {
      return {
        pass: false,
        message: () => "Expected response data to equal expected data`,",
      };
    }
    return { pass: true, message: () => "Success" };
  },
  toReturnError(response, message) {
    const body = getBody(response);
    const error = body.errors[0];
    if (!error) {
      return {
        pass: false,
        message: () => "Expected response to contain an error",
      };
    }
    if (error.message !== message) {
      return {
        pass: false,
        message: () => `Expected error message to be ${message}`,
      };
    }
    return { pass: true, message: () => "Success" };
  },
});
