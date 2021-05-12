import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver } from "graphql";
import errorResponse from "../../utils/errorResponse";

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const value = field;
    value.resolve = async (...args) => {
      const context = args[2];
      if (!context || !context.user) {
        return errorResponse(
          "AuthenticationError",
          "Not allowed. Login please :/",
        );
      }
      return resolve.apply(this, args);
    };
  }
}

export default IsAuthenticatedDirective;
