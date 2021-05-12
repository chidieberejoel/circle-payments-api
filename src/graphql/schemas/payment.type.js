import { gql } from "apollo-server-express";

const paymentDetails = gql`
  input CreateCardInput {
    idempotencyKey: ID!
    number: String!
    cvv: String!
    name: String!
    city: String!
    country: String!
    line1: String!
    postalCode: String!
    district: String!
    expMonth: String!
    expYear: String!
  }

  input VerifyCardInput {
    id: ID!
  }

  type Card {
    id: String!
    cardId: ID!
    userId: ID!
    status: String!
    errorCode: String!
    createdAt: Date! @date(defaultFormat: "MMMM Do YYYY")
    updatedAt: Date! @date(defaultFormat: "MMMM Do YYYY")
  }

  type VerifyCard {
    id: String!
    status: String!
    errorCode: String
    network: String!
    createDate: Date! @date(defaultFormat: "MMMM Do YYYY")
    updateDate: Date! @date(defaultFormat: "MMMM Do YYYY")
  }

  type Amount {
    amount: String!
    currency: String!
  }

  type VerifyPayment {
    id: String!
    status: String!
    errorCode: String
    type: String!
    amount: Amount!
    description: String
    createDate: Date! @date(defaultFormat: "MMMM Do YYYY")
    updateDate: Date! @date(defaultFormat: "MMMM Do YYYY")
  }

  input CreatePaymentInput {
    idempotencyKey: String!
    upgrade: Level!
    description: String
  }

  input VerifyPaymentInput {
    id: ID!
  }

  input FindByPaymentId {
    paymentId: ID!
  }

  input FindByCardId {
    cardId: ID!
  }

  type Payment {
    id: ID!
    userId: ID!
    paymentId: ID!
    amount: String!
    status: String!
    currency: String!
    sourceId: ID!
    sourceType: String!
    receivableAmount: String!
    levelFrom: String!
    levelTo: String!
    errorCode: String!
    createdAt: Date! @date(defaultFormat: "MMMM Do YYYY")
    updatedAt: Date! @date(defaultFormat: "MMMM Do YYYY")
  }

  extend type Mutation {
    createorupdatecard(input: CreateCardInput): Card! @isAuthenticated
    createpayment(input: CreatePaymentInput!): Payment!
      @isAuthorized(levels: [basic, premium])
  }

  extend type Query {
    findmycard: Card! @isAuthenticated
    findmypayments: [Payment!]! @isAuthenticated
    verifycard(input: VerifyCardInput!): VerifyCard! @isAuthenticated
    verifypayment(input: VerifyPaymentInput!): VerifyPayment! @isAuthenticated
  }
`;

export default paymentDetails;
