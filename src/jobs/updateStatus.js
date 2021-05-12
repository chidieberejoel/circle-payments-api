/* eslint-disable no-await-in-loop */
import logger from "../config/winstonlog";
import { verifyCard, verifyPayment } from "../utils/payment/endpoints";
import Payment from "../services/payment";
import Card from "../services/card";
import User from "../services/user";

const updateLevel = async () => {
  try {
    const pendingCards = await Card.pendingCards("pending");
    const pendingPayments = await Payment.pendingOrConfirmedPayments(
      "paid",
      "failed",
    );
    const maxArr = Math.max(pendingCards.length, pendingPayments.length);
    let i = 0;

    while (i < maxArr) {
      if (pendingCards[i]) {
        const verifyCId = (await verifyCard.verify(pendingCards[i].cardId))
          .data;

        if (pendingCards[i].status !== verifyCId.status) {
          Card.updateCards(
            pendingCards[i].id,
            verifyCId.status,
            verifyCId.updateDate,
          );
        }
      }

      if (pendingPayments[i]) {
        const userLevel = (await User.getUserById(pendingPayments[i].userId)).level;
        const verifyPId = (await verifyPayment.verify(
          pendingPayments[i].paymentId,
        )).data;
        if (pendingPayments[i].status !== verifyPId.status) {
          await Payment.updatePayments(
            pendingPayments[i].id,
            verifyPId.status,
            verifyPId.updateDate,
          );
          if (
            (verifyPId.status === "confirmed" || verifyPId.status === "paid")
            && userLevel !== pendingPayments[i].levelTo
          ) {
            await User.updateUserLevel(
              pendingPayments[i].userId,
              pendingPayments[i].levelTo,
            );
          }
        }
      }

      i += 1;
    }
    logger.info("SUCCESSFULLY CHECKED FOR PENDING CARDS/PAYMENTS :)");
  } catch (error) {
    logger.warn(error);
  }
};

export default updateLevel;
