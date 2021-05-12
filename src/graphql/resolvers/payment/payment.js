import { errorResponse, validateLevel } from "../../../utils";
import amount from "../../../helpers/charge";
import { paymentValidation } from "../../../helpers";
import { createPayment, verifyPayment } from "../../../utils/payment/endpoints";

const Resolver = {
  Mutation: {
    createpayment: paymentValidation(
      async (_root, { input }, {
        Payment, Card, user, req, User,
      }) => {
        try {
          if (!validateLevel(user.level, input.upgrade)) {
            return errorResponse(
              "UserInputError",
              `Enter a level above your current level - ${user.level}`,
            );
          }
          const getCard = await Card.findByUserId(user.id);
          if (!getCard) {
            return errorResponse("Error", "You need to create a card first.");
          }
          const amountPayable = amount(user.level, input.upgrade);
          // idempotencyKey should be a random uuid string
          const options = {
            idempotencyKey: input.idempotencyKey,
            amount: {
              amount: amountPayable.toString(),
              currency: "USD",
            },
            verification: "none",
            source: {
              id: getCard.cardId,
              type: "card",
            },
            description: input.description || "",
          };
          const createNewPayment = await createPayment.pay(options, req);
          const data = {
            userId: user.id,
            paymentId: createNewPayment.id,
            sourceId: createNewPayment.source.id,
            amount: createNewPayment.amount.amount,
            status: createNewPayment.status,
            currency: createNewPayment.amount.currency,
            sourceType: createNewPayment.source.type,
            receivableAmount: amountPayable,
            levelFrom: user.level,
            levelTo: input.upgrade,
            errorCode: createNewPayment.errorCode || "",
            createDate: createNewPayment.createDate,
            updateDate: createNewPayment.updateDate,
          };
          const newPayment = await Payment.createPayment(data);
          if (
            newPayment.status === "confirmed"
            || newPayment.status === "paid"
          ) {
            await User.updateUserLevel(user.id, input.upgrade);
          }
          return newPayment;
        } catch (error) {
          return errorResponse("Error", error);
        }
      },
    ),
  },
  Query: {
    verifypayment: async (_root, { input }) => {
      const { id } = input;
      try {
        const verify = await verifyPayment.verify(id);
        return verify.data;
      } catch (error) {
        return errorResponse("Error", error);
      }
    },
    findmypayments: async (_root, _args, { Payment, user }) => {
      try {
        const findPayment = await Payment.findByUserId(user.id);
        return findPayment;
      } catch (error) {
        return errorResponse("Error", error);
      }
    },
  },
};

export default Resolver;
