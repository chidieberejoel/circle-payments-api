import {
  UserInputError,
  AuthenticationError,
  ValidationError,
  ForbiddenError,
} from "apollo-server-express";

const errorResponse = (errorType, message) => {
  switch (errorType) {
    case "ValidationError":
      throw new ValidationError(message);
    case "AuthenticationError":
      throw new AuthenticationError(message);
    case "UserInputError":
      throw new UserInputError(message);
    case "ForbiddenError":
      throw new ForbiddenError(message);
    default:
      throw new Error(message);
  }
};

export default errorResponse;
