import encryptData from "../encrypt";
import metadata from "../metadata";
import { axiosCreate, errorResponse } from "../../index";

class createCard {
  static async create(options, req) {
    const dataToEncrypt = {
      number: options.number.toString(),
      cvv: options.cvv.toString(),
    };

    const dataEncrypted = await encryptData(dataToEncrypt);

    try {
      const createCardValue = await axiosCreate.post("/cards", {
        idempotencyKey: options.idempotencyKey,
        keyId: dataEncrypted.keyId,
        encryptedData: dataEncrypted.encryptedData,
        billingDetails: options.billingDetails,
        expMonth: options.expMonth,
        expYear: options.expYear,
        metadata: metadata(req),
      });
      return createCardValue.data.data;
    } catch (error) {
      return errorResponse("Error", error);
    }
  }
}

export default createCard;
