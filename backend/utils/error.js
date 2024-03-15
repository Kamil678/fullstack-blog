export const errorHandler = (errStatusCode, errMessage) => {
  const error = new Error();

  error.statusCode = errStatusCode;
  error.message = errMessage;

  return error;
};
