import { gql } from "apollo-server-express";
import client from "../base/base";
import { user } from "../base/data";

const cardTest = () => describe("Card Mutation/Queries", () => {
  let cardId = null;

  it("creates/updates a user's card", async () => {
    const CREATE_UPDATE_CARD = gql`
      mutation createorupdatecard($details: CreateCardInput!) {
        createorupdatecard(input: $details) {
          id
          cardId
          userId
          status
          errorCode
          createdAt
          updatedAt
        }
      }
    `;

    const response = await client.mutate({
      mutation: CREATE_UPDATE_CARD,
      variables: {
        details: {
          idempotencyKey: "f96596eb-edc9-4af6-81cf-7ada0cae52c7",
          number: "4007410000000006",
          cvv: "123",
          name: "Customer 0002",
          city: "Test City",
          country: "US",
          line1: "Test",
          postalCode: "11111",
          district: "MA",
          expMonth: "01",
          expYear: "2025",
        },
      },
    });

    cardId = response.data.createorupdatecard.cardId;
    expect(response.data.createorupdatecard).toHaveProperty("status");
    expect(response.data.createorupdatecard.userId).toBe(user.data.id);
  });

  it("verify a card", async () => {
    const VERIFY_CARD = gql`
      query verifycard($value: VerifyCardInput!) {
        verifycard(input: $value) {
          id
          status
          network
        }
      }
    `;

    const response = await client.query({
      query: VERIFY_CARD,
      variables: {
        value: {
          id: cardId,
        },
      },
    });

    expect(response.data.verifycard).toHaveProperty("network");
  });

  it("find a user's card", async () => {
    const FIND_CARD = gql`
      query {
        findmycard {
          id
          userId
          cardId
        }
      }
    `;
    const response = await client.query({ query: FIND_CARD });

    expect(response.data.findmycard.userId).toBe(user.data.id);
  });
});

export default cardTest;
