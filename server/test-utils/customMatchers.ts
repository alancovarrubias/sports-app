import _ from "lodash";
import { diff } from 'jest-diff'

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
  const difference = diff(body.data, expectedData)
  const pass = difference.includes('have no visual difference')
  return { pass, message: () => difference };
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
