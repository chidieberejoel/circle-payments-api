import { gql } from "apollo-server-express";

const userTypes = gql`
  enum Level {
    basic
    premium
    pro
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    isActive: Boolean!
    level: String!
    createdAt: Date! @date(defaultFormat: "MMMM Do YYYY")
    updatedAt: Date! @date(defaultFormat: "MMMM Do YYYY")
  }

  type AuthUser {
    user: User!
    token: String!
  }

  input SignupInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input SigninInput {
    email: String!
    password: String!
  }

  extend type Query {
    me: User! @isAuthenticated
  }

  extend type Mutation {
    signup(input: SignupInput!): User!
    signin(input: SigninInput): AuthUser!
  }
`;

export default userTypes;
