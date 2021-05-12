import { gql } from "apollo-server-express";
import User from "./schemas/user.type";
import Payment from "./schemas/payment.type";

const Root = gql`
  scalar Date

  directive @date(defaultFormat: String = "MMMM Do YYYY") on FIELD_DEFINITION

  directive @isAuthorized(levels: [String!]) on FIELD_DEFINITION | FIELD

  directive @isAuthenticated on FIELD_DEFINITION

  # Empty but necessary fields
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

const combinedTypes = [Root, User, Payment];

export default combinedTypes;
