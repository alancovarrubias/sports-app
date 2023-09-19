import _ from "lodash";

export const hasNoErrors = (body) => {
  if (body.errors) {
    return {
      pass: false,
      message: () => body.errors[0].message,
    };
  }
  return { pass: true, message: () => "Success" };
};

export const returnsData = (body, expectedData) => {
  if (!_.isEqual(body.data, expectedData)) {
    return {
      pass: false,
      message: () => body.data,
    };
  }
  return { pass: true, message: () => "Success" };
};

export const returnsError = (body, expectedMessage) => {
  const error = body.errors[0];
  if (!error) {
    return {
      pass: false,
      message: () => "Expected response to contain an error",
    };
  }
  if (error.message !== expectedMessage) {
    return {
      pass: false,
      message: () => `Expected error message to be ${expectedMessage}`,
    };
  }
  return { pass: true, message: () => "Success" };
};
