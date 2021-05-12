import { GraphQLScalarType, Kind } from "graphql";
import moment from "moment";

export const dateScalarType = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return moment(value).format("MMMM Do YYYY");
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
};

export default dateScalarType;
