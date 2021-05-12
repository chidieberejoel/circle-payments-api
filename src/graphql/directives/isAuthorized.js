import { SchemaDirectiveVisitor } from "apollo-server-express";
import {
  GraphQLDirective,
  DirectiveLocation,
  GraphQLList,
  defaultFieldResolver,
} from "graphql";
import errorResponse from "../../utils/errorResponse";

class isAuthorizedDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(_directiveName, schema) {
    return new GraphQLDirective({
      name: "isAuthorized",
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        levels: {
          type: new GraphQLList(schema.getType("Level")),
        },
      },
    });
  }

  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { levels } = this.args;
    const value = field;
    value.resolve = async (...args) => {
      const [, , context] = args;
      if (!context || !context.user) {
        return errorResponse(
          "AuthenticationError",
          "Not allowed. Login please :/",
        );
      }
      const userLevel = context.user.level;

      if (levels.some((level) => userLevel.indexOf(level) !== -1)) {
        return resolve.apply(this, args);
      }
      return errorResponse("ForbiddenError", "You are already a Pro User");
    };
  }
}

export default isAuthorizedDirective;
