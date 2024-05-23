export const errorHandler = (errStatusCode, errException, errMessage) => {
  const error = new Error();

  error.statusCode = errStatusCode;
  error.exception = errException;
  error.message = errMessage;

  return error;
};
