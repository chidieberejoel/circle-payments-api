import { errorResponse } from "../../../utils";
import { createCard, verifyCard } from "../../../utils/payment/endpoints";
import { cardValidation } from "../../../helpers";

const Resolver = {
  Mutation: {
    createorupdatecard: cardValidation(
      async (_root, { input }, { Card, req, user }) => {
        // idempotencyKey should be a random uuid value
        const options = {
          idempotencyKey: input.idempotencyKey,
          number: input.number,
          cvv: input.cvv,
          billingDetails: {
            name: input.name,
            city: input.city,
            country: input.country,
            line1: input.line1,
            postalCode: input.postalCode,
            district: input.district,
          },
          expMonth: input.expMonth,
          expYear: input.expYear,
        };
        try {
          const createNewCard = await createCard.create(options, req);
          const data = {
            cardId: createNewCard.id,
            userId: user.id,
            status: createNewCard.status,
            errorCode: createNewCard.errorCode || "",
            createDate: createNewCard.createDate,
            updateDate: createNewCard.updateDate,
          };
          const getCard = await Card.findByUserId(user.id);
          if (getCard) {
            await Card.deleteCard(user.id);
          }
          const newCard = await Card.createCard(data);
          return newCard;
        } catch (error) {
          return errorResponse("Error", error);
        }
      },
    ),
  },
  Query: {
    verifycard: async (_root, { input }) => {
      const { id } = input;
      try {
        const verify = await verifyCard.verify(id);
        return verify.data;
      } catch (error) {
        return errorResponse("Error", error);
      }
    },
    findmycard: async (_root, _args, { Card, user }) => {
      try {
        const findCard = await Card.findByUserId(user.id);
        return findCard;
      } catch (error) {
        return errorResponse("Error", error);
      }
    },
  },
};

export default Resolver;
