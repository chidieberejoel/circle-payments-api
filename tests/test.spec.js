import Context from "./base/context";

import userSuite from "./graphql/user";
import cardSuite from "./graphql/card";
import paymentSuite from "./graphql/payment";

beforeAll(async () => {
  await Context.build();
});

afterAll(async () => {
  await Context.close();
});

describe("Sequentially run tests", () => {
  userSuite();
  cardSuite();
  paymentSuite();
});
