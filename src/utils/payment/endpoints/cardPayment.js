import { axiosCreate, errorResponse } from "../../index";
import metadata from "../metadata";

class createPayment {
  static async pay(options, req) {
    try {
      const makePayment = await axiosCreate.post("/payments", {
        idempotencyKey: options.idempotencyKey,
        metadata: metadata(req),
        amount: options.amount,
        verification: options.verification,
        source: options.source,
        description: options.description,
      });
      return makePayment.data.data;
    } catch (error) {
      return errorResponse("Error", error);
    }
  }
}

export default createPayment;
