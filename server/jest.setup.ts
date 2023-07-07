import _ from "lodash";
import {
  hasNoErrors,
  returnsData,
  returnsError,
} from "./test-utils/customMatchers";
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
const withResponseBodyHook = (fn) => {
  return function (response, ...args) {
    return fn.apply(this, [getBody(response), ...args]);
  };
};
expect.extend({
  toHaveNoErrors(response) {
    return withResponseBodyHook(hasNoErrors)(response);
  },
  toReturnData(response, expectedData) {
    return withResponseBodyHook(returnsData)(response, expectedData);
  },
  toReturnError(response, expectedMessage) {
    return withResponseBodyHook(returnsError)(response, expectedMessage);
  },
});
