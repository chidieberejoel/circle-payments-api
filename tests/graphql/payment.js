import { gql } from "apollo-server-express";
import client from "../base/base";
import { user } from "../base/data";

const paymentTest = () => describe("Payment Mutation/Queries", () => {
  let paymentId = null;

  it("creates user's payment", async () => {
    const CREATE_PAYMENT = gql`
        mutation createpayment($details: CreatePaymentInput!) {
          createpayment(input: $details) {
            id
            userId
            status
            amount
            paymentId
          }
        }
      `;

    const response = await client.mutate({
      mutation: CREATE_PAYMENT,
      variables: {
        details: {
          idempotencyKey: "20a17d73-80d7-4fe0-b5ec-80514c5e43c9",
          upgrade: "premium",
          description: "Upgrade to premium",
        },
      },
    });

    paymentId = response.data.createpayment.paymentId;
    expect(response.data.createpayment.amount).toBe("1.01");
    expect(response.data.createpayment.userId).toBe(user.data.id);
  });

  it("verifies a user's payment", async () => {
    const VERIFY_PAYMENT = gql`
        query verifypayment($value: VerifyPaymentInput!) {
          verifypayment(input: $value) {
            id
            type
            amount {
              amount
              currency
            }
            status
          }
        }
      `;

    const response = await client.query({
      query: VERIFY_PAYMENT,
      variables: {
        value: {
          id: paymentId,
        },
      },
    });

    expect(response.data.verifypayment.type).toBe("payment");
    expect(response.data.verifypayment.amount.amount).toBe("1.01");
  });

  it("find a user's payment(s)", async () => {
    const FIND_PAYMENTS = gql`
      query {
        findmypayments {
          id
          paymentId
          amount
          userId
        }
      }
    `;

    const response = await client.query({
      query: FIND_PAYMENTS,
    });

    expect(response.data.findmypayments[0].userId).toBe(user.data.id);
  });
});

export default paymentTest;
